import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface ResourceFrontmatter {
  title: string
  type: "Guide" | "Template" | "Checklist"
  slug: string
  excerpt: string
  tags: string[]
  download: string
  language: string
  published: string
  cover?: string
}

export interface Resource extends ResourceFrontmatter {
  content: string
}

const resourcesDirectory = path.join(process.cwd(), "content/resources")

export function getAllResources(): Resource[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(resourcesDirectory)) {
      console.warn("[v0] Resources directory not found:", resourcesDirectory)
      return []
    }

    const fileNames = fs.readdirSync(resourcesDirectory)
    const mdxFiles = fileNames.filter((fileName) => fileName.endsWith(".mdx"))

    const resources = mdxFiles.map((fileName) => {
      const fullPath = path.join(resourcesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        ...(data as ResourceFrontmatter),
        content,
      }
    })

    // Sort by published date descending
    return resources.sort((a, b) => {
      return new Date(b.published).getTime() - new Date(a.published).getTime()
    })
  } catch (error) {
    console.error("[v0] Error loading resources:", error)
    return []
  }
}

export function checkDownloadExists(downloadPath: string): boolean {
  try {
    const fullPath = path.join(process.cwd(), "public", downloadPath)
    return fs.existsSync(fullPath)
  } catch {
    return false
  }
}
