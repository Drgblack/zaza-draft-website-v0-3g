import { defineConfig } from "@playwright/test";
export default defineConfig({
  workers: 1,
  timeout: 60000,
  retries: 2,
  use: { headless: true, baseURL: process.env.AUDIT_BASE_URL ?? "http://localhost:4311" },
  reporter: [["list"]],
});


