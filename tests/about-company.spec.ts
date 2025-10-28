import { test, expect } from "@playwright/test";

test.describe('About/Company pages i18n + UX', () => {
  test('EN page renders content, CTAs, no raw keys, no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/about/company');

    // Hero + key strings
    await expect(page.getByRole('heading', { name: 'About Zaza Technologies' })).toBeVisible();
    await expect(page.getByText("You didn't become a teacher to write emails.")).toBeVisible();

    // Section headers present
    await expect(page.getByRole('heading', { name: 'Why Teachers Need Zaza' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Why Teachers Trust Zaza' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'A Day With Zaza' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Our Promise' })).toBeVisible();

    // Founder link
    await expect(page.getByRole('link', { name: /Greg's journey/i })).toHaveAttribute('href', '/about/founder');

    // CTAs with data-cta attributes
    await expect(page.locator('a[data-cta="about-mid"]')).toHaveAttribute('href', '/signup');
    await expect(page.locator('a[data-cta="about-final"]')).toHaveAttribute('href', '/signup');

    // No raw i18n keys
    await expect(page.locator('body')).not.toContainText('about.company.');

    // No console errors
    expect(consoleErrors).toEqual([]);
  });

  test('DE page renders content, CTAs, and differs from EN', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    await page.goto('/de/about/company');

    // Verify German hero title and key strings
    await expect(page.getByRole('heading', { name: 'Über Zaza Technologies' })).toBeVisible();
    await expect(page.getByText('Sie sind nicht Lehrer geworden, um E-Mails zu schreiben.')).toBeVisible();

    // Founder link points to DE
    await expect(page.getByRole('link', { name: /Gregs Weg/i })).toHaveAttribute('href', '/de/about/founder');

    // CTAs with data-cta attributes
    await expect(page.locator('a[data-cta="about-mid"]')).toHaveAttribute('href', '/signup');
    await expect(page.locator('a[data-cta="about-final"]')).toHaveAttribute('href', '/signup');

    // No raw i18n keys
    await expect(page.locator('body')).not.toContainText('about.company.');

    // German CTA label snippet present
    await expect(page.locator('body')).toContainText('Kostenlose 14');

    // Blockquote text snippet present (DE)
    await expect(page.locator('blockquote')).toContainText('Wir sehen eine Zukunft');

    // Check at least 5 EN↔DE differences by asserting English phrases are absent
    await expect(page.locator('body')).not.toContainText('Why Teachers Need Zaza');
    await expect(page.locator('body')).not.toContainText('Why Teachers Trust Zaza');
    await expect(page.locator('body')).not.toContainText('A Day With Zaza');
    await expect(page.locator('body')).not.toContainText('Our Promise');
    await expect(page.locator('body')).not.toContainText("Learn more about Greg's journey");

    // No console errors
    expect(consoleErrors).toEqual([]);
  });
});
