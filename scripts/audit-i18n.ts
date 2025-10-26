#!/usr/bin/env tsx
import { promises as fs } from 'fs'
import * as path from 'path'
import { detectRawKeys, extractTranslations, findTKeys, walk, writeCSV, type IssueRow, readFileSafe } from './audit-utils'

async function main() {
  const root = process.cwd()
  const appDir = path.join(root, 'app')
  const componentsDir = path.join(root, 'components')
  const langFile = path.join(root, 'lib', 'i18n', 'language-context.tsx')
  const langSrc = await readFileSafe(langFile)
  const { en, de } = extractTranslations(langSrc)
  const issues: IssueRow[] = []
  const suppressPatterns = [/^demoModal\./]

  // Scan files for t()/ct() keys and raw keys
  const targets: string[] = []
  for await (const f of walk(appDir)) {
    if (/\.(tsx|mdx)$/.test(f) && /page\.(tsx|mdx)$/.test(f)) targets.push(f)
  }
  for await (const f of walk(componentsDir)) {
    if (/\.(tsx|mdx)$/.test(f)) targets.push(f)
  }

  const seenRoutes = new Set<string>()
  for (const file of targets) {
    const src = await fs.readFile(file, 'utf8')
    const keys = findTKeys(src)
    const raws = detectRawKeys(src)
    const route = file.startsWith(appDir) ? '/' + path.relative(appDir, path.dirname(file)).replace(/\\/g, '/') : '(component)'
    seenRoutes.add(route)

    // Missing keys per locale
    for (const k of keys) {
      const suppressed = suppressPatterns.some((re) => re.test(k))
      const sev = suppressed ? 'low' : 'medium'
      if (!en[k]) issues.push({ route, key: k, locale: 'en', type: 'missing_key', severity: sev as any, suggestion: 'Add EN translation' })
      if (!de[k]) issues.push({ route, key: k, locale: 'de', type: 'missing_key', severity: sev as any, suggestion: 'Add DE translation' })
    }
    // Raw keys rendered literally
    for (const k of raws) {
      const suppressed = suppressPatterns.some((re) => re.test(k))
      const sev = suppressed ? 'low' : 'high'
      issues.push({ route, key: k, locale: '', type: 'raw_key', severity: sev as any, suggestion: 'Wrap with ct("key") and add translations' })
    }
  }

  // Write CSV
  const out = path.join(root, 'docs', 'audits', 'i18n-issues.csv')
  await writeCSV(issues, out)

  // Optionally write locales from extracted translations for visibility
  const localesDir = path.join(root, 'locales')
  await fs.mkdir(localesDir, { recursive: true })
  await fs.writeFile(path.join(localesDir, 'en.json'), JSON.stringify(en, null, 2))
  await fs.writeFile(path.join(localesDir, 'de.json'), JSON.stringify(de, null, 2))

  const strict = process.argv.includes('--strict')
  if (strict) {
    const hasHigh = issues.some((i) => i.severity === 'high')
    if (hasHigh) {
      console.error('High severity i18n issues found')
      process.exit(1)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
