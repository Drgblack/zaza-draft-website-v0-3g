import assert from "node:assert/strict";
import { detectLocaleFromPath, toLocalePath } from "../lib/i18n/locale-routing";

function run() {
  const startPath = "/best-ai-tool-parent-emails";
  const switchedPath = toLocalePath(startPath, "de");
  const switchedLocale = detectLocaleFromPath(switchedPath);
  const switchedBackPath = toLocalePath(switchedPath, "en");

  assert.equal(
    switchedPath,
    "/de/best-ai-tool-parent-emails",
    "DE toggle should route-switch immediately from EN path",
  );
  assert.equal(
    switchedLocale,
    "de",
    "Locale should resolve to DE after first toggle",
  );
  assert.equal(
    switchedBackPath,
    "/best-ai-tool-parent-emails",
    "EN toggle should route back from DE path",
  );

  console.log("locale routing test passed");
}

run();
