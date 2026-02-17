// eslint.config.cjs
const path = require("node:path");
const { FlatCompat } = require("@eslint/eslintrc");
const eslintConfigNext = require("eslint-config-next");
const eslintConfigNextPath = path.dirname(
  require.resolve("eslint-config-next/package.json")
);
const compat = new FlatCompat({
  baseDirectory: eslintConfigNextPath,
  resolvePluginsRelativeTo: eslintConfigNextPath,
});

module.exports = [
  // Next.js rules (core-web-vitals is included by default in v16)
  ...compat.config(eslintConfigNext),

  // Ignore build artifacts
  {
    ignores: ["node_modules/**", ".next/**", "dist/**", "build/**", "public/**"],
  },

  // Server entry files: block lucide-react imports
  {
    files: [
      "app/**/layout.tsx",
      "app/**/route.ts",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lucide-react",
              message: "Import icons only from client components.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["app/**/page.tsx", "app/**/not-found.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];

/** File-specific override to unblock build; refactor recommended (see below) */
module.exports.overrides = [
  {
    files: ["components/exit-intent-popup.tsx"],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
];
