const fs = require("fs")
const path = require("path")

const filesToScan = [
  path.join("components", "site-header.tsx"),
  path.join("components", "Footer.tsx"),
]
const appRoot = path.join(__dirname, "..", "app")

const missingLinks = []

filesToScan.forEach((relativePath) => {
  const absolutePath = path.join(__dirname, "..", relativePath)
  if (!fs.existsSync(absolutePath)) {
    console.warn(`Skipping missing file ${relativePath}`)
    return
  }
  const content = fs.readFileSync(absolutePath, "utf-8")
  const regex = /href="(\/[^"]+)"/g

  let match
  while ((match = regex.exec(content)) !== null) {
    const rawHref = match[1]
    const href = rawHref.split(/[?#]/)[0].replace(/\/+$/, "")
    const normalized = href === "" ? "/" : href

    let exists = false
    if (normalized === "/") {
      exists = fs.existsSync(path.join(appRoot, "page.tsx"))
    } else {
      const segments = normalized.split("/").filter(Boolean)
      const routeDir = path.join(appRoot, ...segments)
      const candidates = [
        path.join(routeDir, "page.tsx"),
        path.join(routeDir, "page.ts"),
        path.join(routeDir, "page.jsx"),
        path.join(routeDir, "route.ts"),
        path.join(routeDir, "route.tsx"),
      ]
      exists = candidates.some((candidate) => fs.existsSync(candidate))
    }

    if (!exists) {
      missingLinks.push({
        file: relativePath,
        href: rawHref,
      })
    }
  }
})

if (missingLinks.length) {
  console.log("Missing internal routes:")
  missingLinks.forEach((item) => {
    console.log(`- ${item.href} referenced in ${item.file}`)
  })
} else {
  console.log("All referenced internal links resolve to existing routes.")
}
