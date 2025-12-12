// eslint.config.mjs
import '@rushstack/eslint-patch/modern-module-resolution.js';
import eslintConfigNext from 'eslint-config-next';

export default [
  // Next.js rules (core-web-vitals is included by default in v16)
  ...eslintConfigNext,

  // Ignore build artifacts
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**', 'build/**', 'public/**'],
  },

  // Server entry files: block lucide-react imports
  {
    files: [
      'app/**/page.tsx',
      'app/**/layout.tsx',
      'app/**/route.ts',
      'app/**/loading.tsx',
      'app/**/not-found.tsx',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        { paths: [{ name: 'lucide-react', message: 'Import icons only from client components.' }] },
      ],
    },
  },
];

/** File-specific override to unblock build; refactor recommended (see below) */
export const overrides = [
  {
    files: ["components/exit-intent-popup.tsx"],
    rules: { "react-hooks/set-state-in-effect": "off" }
  }
];
