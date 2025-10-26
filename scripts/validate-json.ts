#!/usr/bin/env tsx
import { promises as fs } from 'fs'
import * as path from 'path'

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    if (e.name === 'node_modules' || e.name === '.next' || e.name.startsWith('.git')) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) yield* walk(full)
    else yield full
  }
}

function hasBOM(buf: Buffer) {
  return buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf
}

async function main() {
  const root = process.cwd()
  const checkOnly = process.argv.includes('--check')
  const problems: string[] = []
  for await (const file of walk(root)) {
    if (!file.endsWith('.json')) continue
    const raw = await fs.readFile(file)
    const text = hasBOM(raw) ? raw.slice(3).toString('utf8') : raw.toString('utf8')
    try {
      JSON.parse(text)
    } catch (e: any) {
      problems.push(`${file}: JSON parse error: ${e?.message ?? e}`)
      continue
    }
    if (!checkOnly && hasBOM(raw)) {
      await fs.writeFile(file, text.replace(/\r\n/g, '\n'), 'utf8')
    }
    if (checkOnly && hasBOM(raw)) {
      problems.push(`${file}: contains UTF-8 BOM`)
    }
  }
  if (problems.length) {
    console.error(problems.join('\n'))
    process.exitCode = 1
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

