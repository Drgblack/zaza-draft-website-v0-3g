import { defineConfig } from "@playwright/test";
export default defineConfig({
  retries: 1,
  use: { headless: true, baseURL: process.env.AUDIT_BASE_URL ?? "http://localhost:3000" },
  reporter: [["list"]],
});
