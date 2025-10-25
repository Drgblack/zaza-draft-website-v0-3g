import { test, expect } from '@playwright/test'

const routes = ['/', '/glossary', '/contact']

for (const locale of ['en', 'de'] as const) {
  for (const route of routes) {
    test(`no raw i18n keys: ${locale} ${route}`, async ({ page }) => {
      const url = process.env.SITE_ORIGIN || 'http://localhost:3000'
      await page.goto(url + route)
      const bodyText = await page.locator('body').innerText()
      expect(bodyText).not.toMatch(/\b[a-z]+\.[a-z0-9_.-]+\b/)
    })
  }
}

