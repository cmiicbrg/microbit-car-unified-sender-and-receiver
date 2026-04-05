---
applyTo: "**/*.md"
---

# Markdown instructions

## Goals

- Optimize for readability first and lint cleanliness second.
- Keep Markdown changes consistent with the repository's lint rules.
- Avoid churn: do not reformat unrelated sections just because a linter would allow it.

## Linting and verification

- Keep Markdown changes `markdownlint`-clean.
- Use the repository ruleset in `.markdownlint.json`.
- `MD013` is intentionally disabled. Do not enforce line-length wrapping in prose.
- Prefer single physical lines for a paragraph, list item, or other continuous prose block. Do not insert manual line breaks inside the same paragraph or list item just to keep lines short.
- Prefer the repository-local `markdownlint-cli2` setup when available because it uses `.markdownlint-cli2.jsonc`.

## Writing quality

- Prefer short, readable paragraphs over mechanically wrapped text.
- Use headings only when they improve scanability.
- Keep lists flat and easy to scan.
- Preserve the established tone and level of detail of the surrounding docs.

## Markdown structure

- Use fenced code blocks for commands, config snippets, and multi-line examples.
- Add a language tag to fenced code blocks when there is an obvious one, such as `bash`, `zsh`, `json`, `yaml`, or `csv`.
- Use inline code for commands, file paths, environment variables, and literal config keys.
- Keep headings in a sensible hierarchy; do not skip levels without a reason.

## Practical workflow

- Change only the Markdown that is relevant to the task.
- Run Markdown lint before finishing.
