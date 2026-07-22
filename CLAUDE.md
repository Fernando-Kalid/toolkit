# toolkit — maintainer guide

This repo is Fernando Kalid's distribution hub for Claude utilities: skills (packaged as Claude Code plugin bundles), agents, artifacts, and style systems. It doubles as a Claude Code plugin **marketplace** (`.claude-plugin/marketplace.json`). Audience: followers, friends, and the internal team installing these on their own Claude accounts — assume the repo is public when making changes.

## Source of truth & generated files

- `SKILL.md` YAML frontmatter (`name`, `description`) is the **only** authoritative metadata for a skill. `plugin.json` / `marketplace.json` are authoritative for bundles.
- `catalog.json`, `llms.txt`, and the README block between the `CATALOG` markers are **generated**. Never edit them by hand — run:

```bash
python3 scripts/build_index.py
```

- Run that script after ANY change to skills, plugin manifests, or `agents/`. It also validates that each skill's frontmatter name matches its folder name, and fails loudly if not.

## Layout invariants

- One skill = one folder = `plugins/<bundle>/skills/<skill-name>/SKILL.md` (+ optional `references/`, `assets/`, `scripts/`). Folder name, frontmatter `name`, and zip name are always identical, kebab-case.
- Every bundle needs `plugins/<bundle>/.claude-plugin/plugin.json` **and** an entry in `.claude-plugin/marketplace.json` with `"source": "./plugins/<bundle>"`. Keep descriptions in the two files consistent.
- `scripts/sync_skills.sh` holds the skill→bundle mapping for syncing from the local Claude app cache. Update it when adding/moving skills.
- Anthropic built-in skills (docx, pdf, pptx, xlsx, skill-creator, morning, schedule, setup-cowork, consolidate-memory) are **never** committed here — they ship with Claude and are Anthropic's, not ours.

## Adding things

**Skill**: create the folder under the right bundle's `skills/` → run `build_index.py` → commit. If it fits no bundle, create a new bundle (plugin.json + marketplace entry + mapping in `sync_skills.sh`).

**Agent**: one `.md` per agent in `agents/`, Claude Code subagent format (frontmatter: `name`, `description`, optional `tools`, `model`). `build_index.py` picks it up automatically.

**Artifact / style**: folder or file under `artifacts/` / `styles/` per those READMEs; indexed by name automatically.

## Hygiene (repo may be public)

- Before committing, scan for secrets: `grep -rniE "(api[_-]?key|secret|token|password|BEGIN .* PRIVATE KEY)" plugins/ agents/ styles/` and check nothing personal (client names, unreleased work) is inside skill references.
- No `.DS_Store`, `__pycache__`, `dist/` in git (`.gitignore` covers them; `rsync` in the sync script excludes them).

## Release flow

1. Bump versions if meaningful (`plugin.json` + marketplace entry).
2. `python3 scripts/build_index.py` (indexes fresh), commit, merge to `main`.
3. `git tag vX.Y.Z && git push origin vX.Y.Z` — the `release-zips` workflow builds one zip per skill and attaches them to a GitHub release for claude.ai users.

## Validation before pushing

```bash
python3 scripts/build_index.py            # regenerates + validates frontmatter
python3 -m json.tool .claude-plugin/marketplace.json > /dev/null
bash scripts/package_skills.sh            # smoke-test zip build (output is gitignored)
```
