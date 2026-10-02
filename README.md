# Jev Selection Review for VS Code

Select code, run **Jev: Review Selection**, and receive diagnostics anchored to exact lines already in the selection. Jev answers declared finite questions and then selects line IDs; it never generates a review paragraph or edits code.

## Try an exact-line diagnostic offline

`npm run demo:diagnostic` sends no request: two synthetic answers select an issue and cite one line from a three-line selection. The output shows the precise editor line and range, then rejects an invented line ID. This previews the core contract; the VS Code Extension Development Host still needs an in-editor check.

## Develop

```bash
npm install
npm run check
npm test
```

Press F5 in VS Code to launch an Extension Development Host. Run **Jev: Set TypeSafe API Key** first; the key is stored in VS Code `SecretStorage`, not settings or the workspace. Then select up to 255 non-empty lines and use the editor context menu.

The default pack flags ambiguous intent, possible behavioral risk, and maintainability concerns. These are probabilistic review prompts—not a security scanner, compiler, linter, or substitute for tests. Diagnostics contain only the declared issue label and exact source range.

Tests and demo are entirely offline. The extension bundle and core behavior were validated, but Marketplace packaging and an Extension Development Host smoke test were not available here.

MIT — see [LICENSE](LICENSE).

