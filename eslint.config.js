import { fileURLToPath } from "node:url";
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import ts from "typescript-eslint";
import { defineConfig } from "eslint/config";
import biome from "eslint-config-biome";
import node from "eslint-plugin-n";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

export default defineConfig([
    includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url))),
    js.configs.recommended,
    node.configs["flat/recommended"],
    unicorn.configs["flat/recommended"],
    biome,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2015,
            },
        },
        rules: {
            "no-caller": 2,
            "dot-notation": 2,
            "one-var": [2, "never"],
            "prefer-destructuring": [2, { object: true }],
            "capitalized-comments": [
                2,
                "always",
                {
                    ignorePattern: "biome",
                },
            ],
            "multiline-comment-style": [2, "starred-block"],
            "spaced-comment": 2,
            yoda: [2, "never"],
            curly: [2, "multi-line"],

            "n/no-unpublished-import": 0,

            "unicorn/no-null": 0,
            "unicorn/prefer-code-point": 0,
            "unicorn/prefer-string-slice": 0,
            "unicorn/prefer-at": 0,
        },
    },
    ts.configs.eslintRecommended,
    ...ts.configs.recommended,
    {
        files: ["*.ts"],
        parserOptions: {
            project: "./tsconfig.json",
        },
        rules: {
            curly: [2, "multi-line"],
            "@typescript-eslint/no-use-before-define": [
                2,
                { functions: false },
            ],
            "@typescript-eslint/consistent-type-definitions": [2, "interface"],
            "@typescript-eslint/no-unnecessary-type-arguments": 2,
            "@typescript-eslint/prefer-string-starts-ends-with": 2,
            "@typescript-eslint/prefer-readonly": 2,
            "@typescript-eslint/prefer-includes": 2,
            "@typescript-eslint/no-unnecessary-condition": 2,
            "@typescript-eslint/switch-exhaustiveness-check": 2,
            "@typescript-eslint/prefer-nullish-coalescing": 2,

            "n/no-missing-import": 0,
            "n/no-unsupported-features/es-syntax": 0,
        },
    },
    {
        files: ["*.spec.ts"],
        rules: {
            "n/no-unsupported-features/node-builtins": 0,
        },
    },
    {
        files: ["src/generated/*.ts"],
        rules: {
            "multiline-comment-style": 0,
            "capitalized-comments": 0,
            "unicorn/escape-case": 0,
            "unicorn/no-hex-escape": 0,
            "unicorn/numeric-separators-style": 0,
            "unicorn/prefer-spread": 0,
        },
    },
    {
        files: ["scripts/**/*"],
        rules: {
            "n/no-unsupported-features/es-builtins": 0,
            "n/no-unsupported-features/node-builtins": 0,
        },
    },
]);
