import { test, expect } from '@playwright/test'

const cases = [
  { route: '/ai-literacy', en: [/AI Literacy/, /Browse courses/], de: [/KI-/, /Kurse/] },
  { route: '/webinars', en: [/Professional Development/, /Browse/], de: [/Webinare/, /Bevorstehende/] },
]

for (const c of cases) {
  test(`concrete i18n toggles: ${c.route}`, async ({ page }) => {
    const base = process.env.SITE_ORIGIN || 'http://localhost:3000'
    await page.goto(base + c.route)
    for (const pattern of c.en) await expect(page.locator('body')).toContainText(pattern)
    await page.getByRole('button', { name: 'DE' }).click()
    for (const pattern of c.de) await expect(page.locator('body')).toContainText(pattern)
  })
}
