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

test('ai-literacy toggles EN->DE with body copy changes', async ({ page }) => {
  const base = process.env.SITE_ORIGIN || 'http://localhost:3000'
  await page.goto(base + '/ai-literacy')
  // Capture EN strings
  const enTitle = await page.locator('h1').first().innerText()
  const enPath = await page.getByText(/Choose Your Path|Featured courses/i).first().innerText()
  const enCta = await page.getByText(/Browse courses|Try Zaza Draft/i).first().innerText()
  // Switch to DE via header button
  await page.getByRole('button', { name: 'DE' }).click()
  await expect(page.locator('h1').first()).not.toHaveText(enTitle)
  await expect(page.getByText(/Kurse|KI|Lehr/)).toBeVisible()
  await expect(page.getByText(/Durchsuchen|testen|Mehr erfahren/, { exact: false })).toBeVisible()
})

test('webinars toggles EN->DE with body copy changes', async ({ page }) => {
  const base = process.env.SITE_ORIGIN || 'http://localhost:3000'
  await page.goto(base + '/webinars')
  const enHero = await page.getByRole('heading').first().innerText()
  const enBadge = await page.getByText(/Professional Development|Sessions/).first().innerText()
  const enBenefits = await page.getByText(/Why attend/i).first().innerText()
  await page.getByRole('button', { name: 'DE' }).click()
  await expect(page.getByRole('heading').first()).not.toHaveText(enHero)
  await expect(page.getByText(/Webinare|Zertifikat|Aufzeichnungen/, { exact: false })).toBeVisible()
  await expect(page.getByText(/Warum|Webinaren/, { exact: false })).toBeVisible()
})
