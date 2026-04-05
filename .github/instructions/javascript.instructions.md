---
applyTo: "**/*.{js,ts}"
---

# JavaScript/TypeScript instructions (ESLint)

## Goals

- Favor clear, maintainable code over clever tricks.
- Avoid unrelated refactors or style churn when touching JavaScript/TypeScript files.

## Linting and verification

- Always keep JavaScript/TypeScript changes **ESLint-clean** using the repo's flat config in `eslint.config.js`.
- Before finishing a change, run `npx eslint . --fix` (or `npx eslint path/to/file.ts --fix`) and fix any remaining violations.
- This repo formats code via ESLint; prefer running `npx eslint . --fix` (or `npm run lint:js -- --fix` if available) or using your editor's ESLint integration over manual formatting.
- If ESLint reports errors, fix the underlying issues (or rerun `npm run lint:js -- --fix`) instead of weakening or disabling lint checks.
- Don't silence lint rules (e.g. `eslint-disable`) unless there's no reasonable alternative.

## MakeCode considerations

- TypeScript code is compiled by MakeCode's pxt compiler, not Node.js.
- The `pxt` CLI handles building and deployment.
- Radio and hardware APIs are MakeCode-specific.

## Control flow and data safety

- Validate external or loosely typed data before treating it as trusted.
- Prefer early returns and small helpers over deeply nested conditionals.
- Check for `null` and `undefined` before use instead of assuming values exist.

## Practical workflow

- Change only the code relevant to the task.
- If a workaround depends on a framework invariant or external limitation, leave a brief comment explaining why.
