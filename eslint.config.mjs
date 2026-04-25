import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "check-file": checkFile,
    },
    rules: {
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/components/**/": "KEBAB_CASE",
          "src/store/**/": "KEBAB_CASE",
          "src/hooks/**/": "KEBAB_CASE",
          "src/services/**/": "KEBAB_CASE",
          "src/types/**/": "KEBAB_CASE",
          "src/utils/**/": "KEBAB_CASE",
        },
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "src/components/**/*.{ts,tsx}": "PASCAL_CASE",
          "src/app/**/*.{ts,tsx}": "KEBAB_CASE",
          "src/store/**/*.{ts,tsx}": "CAMEL_CASE",
          "src/hooks/**/*.{ts,tsx}": "CAMEL_CASE",
          "src/utils/**/*.{ts,tsx}": "CAMEL_CASE",
          "src/services/**/*.{ts,tsx}": "CAMEL_CASE",
          "src/types/**/*.{ts,tsx}": "CAMEL_CASE",
        },
        {
          "ignoreMiddleExtensions": true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
