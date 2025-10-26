import { test, expect } from '@playwright/test'

const routes = ['/webinars', '/ai-literacy']

for (const route of routes) {
  test(`renders without console errors: ${route}`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(String(err)))
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    const base = process.env.SITE_ORIGIN || 'http://localhost:3000'
    await page.goto(base + route)
    // basic content presence
    await expect(page.locator('body')).toBeVisible()
    expect(errors, `Console/page errors for ${route}`).toEqual([])
  })
}

