#!/usr/bin/env tsx
const DEFAULT_BASE = process.env.SITE_ORIGIN || process.env.AUDIT_BASE_URL || 'http://localhost:3000'
import { writeCSV, type IssueRow } from './audit-utils'
import * as path from 'path'

async function main() {
  const base = process.env.SITE_ORIGIN || DEFAULT_BASE
  const maxDepth = Number(process.env.LINK_DEPTH || 3)
  const start = new URL('/', base).toString()
  const seen = new Set<string>()
  const issues: IssueRow[] = []
  const q: Array<{ url: string; depth: number; route: string }> = [{ url: start, depth: 0, route: '/' }]

  while (q.length) {
    const { url, depth, route } = q.shift()!
    if (seen.has(url) || depth > maxDepth) continue
    seen.add(url)
    let res: Response
    try {
      res = await fetch(url, { redirect: 'follow' as any })
    } catch (e) {
      issues.push({ route, key: url, locale: '', type: 'external_fail', severity: 'high', suggestion: 'Check server is running or URL is reachable' })
      continue
    }
    const finalURL = res.url
    if (res.status === 404) {
      issues.push({ route, key: finalURL, locale: '', type: 'broken_link', severity: 'high', suggestion: 'Fix or remove link' })
      continue
    }
    // Parse HTML for links and anchors
    const html = await res.text()
    // Check anchors in same-page links
    const anchorMatches = html.matchAll(/href=\"([^\"]+)\"/g)
    for (const m of anchorMatches) {
      let href = m[1]
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) continue
      // Internal links only
      if (href.startsWith('/')) {
        const full = new URL(href, base).toString()
        q.push({ url: full, depth: depth + 1, route: new URL(full).pathname })
        // anchor existence check
        const u = new URL(full)
        if (u.hash) {
          const id = u.hash.slice(1)
          if (!html.includes(`id=\"${id}\"`) && !html.includes(`id='${id}'`)) {
            issues.push({ route: new URL(finalURL).pathname, key: href, locale: '', type: 'anchor_missing', severity: 'low', suggestion: `Add id="${id}" or update link` })
          }
        }
      }
    }
  }

  const out = path.join(process.cwd(), 'docs', 'audits', 'link-issues.csv')
  await writeCSV(issues, out)
  const strict = process.argv.includes('--strict')
  if (strict) {
    const hasHigh = issues.some((i) => i.severity === 'high')
    if (hasHigh) {
      console.error('High severity link issues found')
      process.exit(1)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})



