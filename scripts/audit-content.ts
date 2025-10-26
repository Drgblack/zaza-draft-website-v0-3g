#!/usr/bin/env tsx
import { promises as fs } from 'fs'
import * as path from 'path'
import { walk, writeCSV, type IssueRow } from './audit-utils'

async function main() {
  const root = process.cwd()
  const appDir = path.join(root, 'app')
  const componentsDir = path.join(root, 'components')
  const issues: IssueRow[] = []

  const files: string[] = []
  for await (const f of walk(appDir)) if (/\.(tsx|mdx)$/.test(f)) files.push(f)
  for await (const f of walk(componentsDir)) if (/\.(tsx|mdx)$/.test(f)) files.push(f)

  const placeholderRe = /(TODO|FIXME|lorem ipsum|\bt\(["'].*?["']\)\s*[,}]\s*$)/i
  for (const file of files) {
    const text = await fs.readFile(file, 'utf8')
    const lines = text.split(/\r?\n/)
    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i]
      const m = placeholderRe.exec(ln)
      if (m) {
        const route = file.includes('/app/') ? '/' + path.relative(appDir, path.dirname(file)).replace(/\\/g, '/') : '(component)'
        issues.push({ route, key: m[0].trim(), locale: '', type: 'placeholder', severity: 'low', suggestion: 'Replace with final copy or remove' })
      }
    }
  }

  const out = path.join(root, 'docs', 'audits', 'content-gaps.csv')
  await writeCSV(issues, out)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

