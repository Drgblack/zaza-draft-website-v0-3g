#!/usr/bin/env tsx
const DEFAULT_BASE = process.env.SITE_ORIGIN || process.env.AUDIT_BASE_URL || 'http://localhost:4311'
import { writeCSV, type IssueRow } from './audit-utils'
import * as path from 'path'

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function fetchWithTimeout(url: string, ms: number, init?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...init, signal: controller.signal } as any)
  } finally {
    clearTimeout(id)
  }
}

async function main() {
  const base = process.env.SITE_ORIGIN || DEFAULT_BASE
  const maxDepth = Number(process.env.LINK_DEPTH || 2)
  const concurrency = Math.min(Number(process.env.LINK_CONCURRENCY || 4), 4)
  const timeoutMs = Number(process.env.LINK_TIMEOUT_MS || 8000)
  const retries = Number(process.env.LINK_RETRIES || 2)
  const start = new URL('/', base).toString()
  const seen = new Set<string>()
  const issues: IssueRow[] = []
  const q: Array<{ url: string; depth: number; route: string }> = [{ url: start, depth: 0, route: '/' }]
  const suppressInternal = new Set<string>(['/signup','/signup/','/state-of-ai-report','/state-of-ai-report/'])
  const pending: Array<{ url: string; depth: number; route: string }> = []

  async function processOne(job: { url: string; depth: number; route: string }) {
    const { url, depth, route } = job
    if (seen.has(url) || depth > maxDepth) return
    seen.add(url)

    // Fetch with retries and timeout
    let res: Response | null = null
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        res = await fetchWithTimeout(url, timeoutMs, { redirect: 'follow' as any })
        break
      } catch {
        if (attempt === retries) {
          const isInternal = new URL(url).origin === new URL(base).origin
          issues.push({ route, key: url, locale: '', type: isInternal ? 'broken_link' : 'external_transient', severity: isInternal ? 'high' : 'low', suggestion: isInternal ? 'Fix or remove link' : 'External link flaky (warn only)' })
          return
        }
        await sleep(300 * (attempt + 1))
      }
    }
    if (!res) return
    const finalURL = res.url
    const u = new URL(finalURL)
    const isInternal = u.origin === new URL(base).origin
    if (res.status >= 400) {
      if (isInternal) {
        const p = u.pathname
        if (!suppressInternal.has(p)) {
          issues.push({ route, key: finalURL, locale: '', type: 'broken_link', severity: 'high', suggestion: 'Fix or remove link' })
        } else {
          issues.push({ route, key: finalURL, locale: '', type: 'broken_link', severity: 'low', suggestion: 'Temporarily suppressed (allowlist)' })
        }
      } else {
        const transient = [403, 429, 500, 502, 503, 504]
        issues.push({ route, key: finalURL, locale: '', type: 'external_transient', severity: transient.includes(res.status) ? 'low' : 'low', suggestion: 'External link flaky (warn only)' })
      }
      return
    }

    const html = await res.text()
    const anchorMatches = html.matchAll(/<a [^>]*href=\"([^\"]+)\"/g)
    for (const m of anchorMatches) {
      let href = m[1]
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue
      if (href.startsWith('/')) {
        if (href.startsWith('/_next/') || href.startsWith('/static/') || href.startsWith('/api/')) continue
        const full = new URL(href, base).toString()
        pending.push({ url: full, depth: depth + 1, route: new URL(full).pathname })
        const newUrl = new URL(full)
        if (newUrl.hash) {
          const id = newUrl.hash.slice(1)
          if (!html.includes(`id=\"${id}\"`) && !html.includes(`id='${id}'`)) {
            issues.push({ route: new URL(finalURL).pathname, key: href, locale: '', type: 'anchor_missing', severity: 'low', suggestion: `Add id=\"${id}\" or update link` })
          }
        }
      }
    }
  }

  // Concurrency pool
  const workers: Promise<void>[] = []
  for (let i = 0; i < concurrency; i++) {
    workers.push((async function run() {
      while (q.length) {
        const job = q.shift()!
        await processOne(job)
        while (pending.length) q.push(pending.shift()!)
      }
    })())
  }
  await Promise.all(workers)

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
