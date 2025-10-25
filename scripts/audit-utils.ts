import { promises as fs } from 'fs'
import * as path from 'path'

export interface IssueRow {
  route: string
  key: string
  locale: 'en' | 'de' | ''
  type: 'missing_key' | 'raw_key' | 'runtime_missing' | 'broken_link' | 'redirect_chain' | 'anchor_missing' | 'external_fail' | 'placeholder'
  severity: 'low' | 'medium' | 'high'
  suggestion: string
}

export async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    // skip node_modules and .next
    if (e.name === 'node_modules' || e.name === '.next' || e.name.startsWith('.git')) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

export async function writeCSV(rows: IssueRow[], outPath: string) {
  const header = 'route,key,locale,type,severity,suggestion\n'
  const body = rows
    .map((r) => [r.route, r.key, r.locale, r.type, r.severity, r.suggestion].map(escapeCSV).join(','))
    .join('\n')
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, header + body + (rows.length ? '\n' : ''))
}

function escapeCSV(v: string) {
  if (v == null) return ''
  const s = String(v)
  if (s.includes(',') || s.includes('\n') || s.includes('"')) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

export async function readFileSafe(p: string): Promise<string> {
  try {
    return await fs.readFile(p, 'utf8')
  } catch {
    return ''
  }
}

export function findTKeys(source: string): string[] {
  const keys: string[] = []
  const re = /\b(?:t|ct)\(\s*[`'"]([\w.-]+)[`'"]\s*\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(source))) keys.push(m[1])
  return Array.from(new Set(keys))
}

export function detectRawKeys(source: string): string[] {
  // Very simple heuristic: likely raw key strings in JSX output
  const re = /\{\s*[`'"]([a-z]+\.[a-z0-9_.-]+)[`'"]\s*\}/gi
  const matches = new Set<string>()
  let m: RegExpExecArray | null
  while ((m = re.exec(source))) matches.add(m[1])
  return Array.from(matches)
}

export function extractTranslations(langContextSource: string): { en: Record<string, string>; de: Record<string, string> } {
  // Parse keys from translationsEn and translationsDe objects in lib/i18n/language-context.tsx
  const grab = (name: string) => {
    const re = new RegExp(`const\\s+${name}:[\\s\\S]*?=\\s*\\{([\\s\\S]*?)\\}\\s*`, 'm')
    const m = re.exec(langContextSource)
    const out: Record<string, string> = {}
    if (m) {
      const body = m[1]
      const kv = /"([^"]+)"\s*:\s*"([\s\S]*?)"\s*,?\s*$/gm
      let mm: RegExpExecArray | null
      while ((mm = kv.exec(body))) {
        out[mm[1]] = mm[2]
      }
    }
    return out
  }
  return { en: grab('translationsEn'), de: grab('translationsDe') }
}

