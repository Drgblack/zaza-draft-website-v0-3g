import { test, expect } from '@playwright/test'

test('AI Literacy resource links navigate and render titles', async ({ page }) => {
  const base = process.env.SITE_ORIGIN || 'http://localhost:3000'
  await page.goto(base + '/ai-literacy')
  // Click Parent Email Templates
  const link = page.getByRole('link', { name: /Parent Email Templates/ })
  await expect(link).toBeVisible()
  await link.click()
  await expect(page).toHaveURL(/\/ai-literacy\/resources\//)
  // Assert matching title is present on detail page
  await expect(page.locator('h1, h2')).toContainText(/Parent|Email|Templates/i)

  // Navigate back and click Lesson Plan Templates
  await page.goto(base + '/ai-literacy')
  const link2 = page.getByRole('link', { name: /Lesson Plan Templates/ })
  await expect(link2).toBeVisible()
  await link2.click()
  await expect(page).toHaveURL(/\/ai-literacy\/resources\//)
  await expect(page.locator('h1, h2')).toContainText(/Lesson|Plan/i)
})

