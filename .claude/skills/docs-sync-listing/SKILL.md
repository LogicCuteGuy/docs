---
name: docs-sync-listing
description: Update this docs site (docs.logiccuteguy.com) to match the LogicCuteGuy VPM listing. Use when the user says to update docs from the vpm-listing / list repo, a package got a new release, or package versions in the docs look stale.
---

# Sync docs with the VPM listing

Source of truth is the **live** listing, not the repo files or memory:

```bash
curl -s https://vpm.logiccuteguy.com/index.json | python -c "
import json,sys
d=json.load(sys.stdin)
for k,v in d['packages'].items(): print(k,sorted(v['versions'],key=lambda s:[int(x) for x in s.split('-')[0].split('.')])[-2:])"
```

Compare against `docs/unity-vrc/packages.md` (table + per-package sections). Packages are listed in `source.json` `githubRepos` of `LogicCuteGuy/vpm-listing`; a package in the list with no `docs/unity-vrc/<name>/` folder needs new docs.

## For each package with a newer version

1. Read the release notes and the tag's `package.json` (displayName, `vpmDependencies`, `dependencies`):
   ```bash
   gh release view <tag> -R LogicCuteGuy/<Repo> --json body -q .body
   gh api "repos/LogicCuteGuy/<Repo>/contents/package.json?ref=<tag>" --jq .content | base64 -d
   ```
2. Update **all three languages** — `docs/unity-vrc/`, `i18n/ja/docusaurus-plugin-content-docs/current/unity-vrc/`, `i18n/th/...` (same relative paths):
   - package pages: `Documentation version` line, release/tag URLs, install version, `#<tag>` Git URL, `<id>-<ver>.zip`
   - `packages.md`: table row, `Latest version`, install line, dependencies, display name
   - `landing.md`: section heading version
   - root `README.md`: table row + short paragraph (English only)
3. Add a "What's new in <ver>" section to the package `intro.md` (en/ja/th) from the release notes. Fix dependency/requirement text if `package.json` changed.
4. Leave historical notes (older versions' changelog prose, screenshot captions) alone.

## Gotchas

- Use sed groups carefully: `\10.7.1` is group 10, not group 1 + `0.7.1`. Use `\1: **0.7.1**` style or Python.
- Files may be CRLF; preserve line endings (Python `newline=''`).
- After editing, grep for leftovers: `grep -rn "<oldver>" docs i18n README.md`.

## Verify and ship

```bash
npm run build   # must succeed for en, ja, th
```

Commit as `docs: update <Pkg> <ver> ... to match VPM listing`. Push only when the user asks.
