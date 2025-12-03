import fs from 'fs'
import path from 'path'

// Lightweight validator to check canonical posts in lib/cms/posts-data.ts
// Checks:
// - file exists
// - posts array exported
// - content fields contain only allowed HTML tags
// - content and contentDe are present (if one exists require matching structure)

const allowedTags = ['h2', 'h3', 'p', 'ul', 'ol', 'li', 'strong']

function validateHtmlString(html: string, fileLabel: string) {
  // quick check: reject if backticks or raw markers missing (we cannot perfectly detect String.raw here)
  if (typeof html !== 'string') return [`${fileLabel}: content is not a string`]

  const errors: string[] = []
  // naive tag scanning
  const tagRegex = /<\/?([a-zA-Z0-9-]+)(\s|>|\/)/g
  let m
  while ((m = tagRegex.exec(html)) !== null) {
    const tag = m[1].toLowerCase()
    if (!allowedTags.includes(tag)) {
      errors.push(`${fileLabel}: contains disallowed tag <${tag}>`)
    }
  }

  return errors
}

async function run() {
  const postsPath = path.resolve(process.cwd(), 'lib', 'cms', 'posts-data.ts')
  if (!fs.existsSync(postsPath)) {
    console.error('posts-data.ts not found at', postsPath)
    process.exit(2)
  }

  // import via dynamic import to evaluate the file
  try {
    const mod = await import(postsPath)
    const posts = mod.default || mod.blogPosts || []
    if (!Array.isArray(posts)) {
      console.error('posts-data did not export an array at default or blogPosts')
      process.exit(2)
    }

    let totalErrors: string[] = []
    posts.forEach((p: any, i: number) => {
      const label = `post[${i}] id=${p?.id ?? 'unknown'}`
      if (!p.title) totalErrors.push(`${label}: missing title`)
      if (!p.slug) totalErrors.push(`${label}: missing slug`)
      if (!p.excerpt) totalErrors.push(`${label}: missing excerpt`)
      if (!p.content) totalErrors.push(`${label}: missing content`)

      if (p.content) totalErrors.push(...validateHtmlString(String(p.content), `${label}.content`))
      if (p.contentDe) totalErrors.push(...validateHtmlString(String(p.contentDe), `${label}.contentDe`))

      // if contentDe exists, ensure roughly same headings count
      if (p.content && p.contentDe) {
        const countH2 = (String(p.content).match(/<h2>/g) || []).length
        const countH2De = (String(p.contentDe).match(/<h2>/g) || []).length
        if (Math.abs(countH2 - countH2De) > 2) {
          totalErrors.push(`${label}: EN/DE structural mismatch (h2 count differs by >2)`)        
        }
      }
    })

    if (totalErrors.length) {
      console.error('Validation failed with errors:')
      totalErrors.forEach(e => console.error(' -', e))
      process.exit(3)
    }

    console.log('validate-posts: OK - no issues found')
    process.exit(0)
  } catch (err: any) {
    console.error('Failed to import posts-data.ts:', err?.message || err)
    process.exit(4)
  }
}

run()

