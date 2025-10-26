import { test, expect } from "@playwright/test";

test("webinars page renders without client exception", async ({ page }) => {
  const base = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
  const url = `${base}/webinars`;
  const consoleErrors: string[] = [];
  page.on("console", msg => { if (msg.type() === "error") consoleErrors.push(msg.text()); });

  await page.goto(url, { waitUntil: "domcontentloaded" });
  // Basic sanity: page has some visible content (header or main)
  const bodyText = await page.locator("body").innerText();
  expect(bodyText.length).toBeGreaterThan(50);

  // Fail if console errors indicate a client exception
  expect(consoleErrors, `Console errors on ${url}: ${consoleErrors.join("\n")}`).toEqual([]);
});
