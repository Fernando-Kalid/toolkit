# toolkit — maintainer guide

This repo is Fernando Kalid's distribution hub for Claude utilities: skills, agents, artifacts, and style systems. It doubles as a Claude Code plugin **marketplace** (`.claude-plugin/marketplace.json`) named `fk-toolkit`. Audience: followers, friends, and the internal team installing these on their own Claude accounts — assume the repo is public when making changes.

## Core design: one plugin per skill

Plugins are Claude Code's unit of installation, and users must be able to pick **individual skills** — so every skill ships as its own plugin with the **same name**:

```
plugins/<skill-name>/
  ├── .claude-plugin/plugin.json     name, version; description is AUTO-SYNCED
  └── skills/<skill-name>/SKILL.md   the skill (+ optional references/ assets/ scripts/)
```

Install command is always `/plugin install <skill-name>@fk-toolkit`. Folder name, plugin name, frontmatter `name`, and zip name are always identical, kebab-case.

## Source of truth & generated files

- `SKILL.md` YAML frontmatter (`name`, `description`) is the **only** authoritative metadata for a skill.
- `python3 scripts/build_index.py` derives everything else. It syncs `plugin.json` descriptions and the `plugins` array of `marketplace.json` (rebuilding entries; preserving only hand-set `category`/`tags`), and regenerates `catalog.json`, `llms.txt`, and the README block between the `CATALOG` markers. **Never edit any of those by hand.**
- Run it after ANY change to skills, plugin manifests, or `agents/`. It validates frontmatter and fails loudly on mismatches. It is idempotent.
- Hand-maintained surfaces: README prose outside the markers, `docs/INSTALL.md`, per-plugin `category`/`tags` in `marketplace.json`, marketplace `owner`/`metadata`, and `plugin.json` `version`.

## Layout invariants

- `CATEGORY_TITLES` in `scripts/build_index.py` maps categories (`decks`, `business`, `marketing`) to README section titles — extend it when adding a category.
- `scripts/sync_skills.sh` holds the `SKILLS` list for syncing from the local Claude app cache. Update it when adding/removing skills.
- Anthropic built-in skills (docx, pdf, pptx, xlsx, skill-creator, morning, schedule, setup-cowork, consolidate-memory) are **never** committed here — they ship with Claude and are Anthropic's, not ours.

## Adding things

**Skill**: create `plugins/<name>/skills/<name>/SKILL.md`, add a minimal `plugins/<name>/.claude-plugin/plugin.json` (`{"name", "version": "0.1.0", "description": "", "author"}`), add the name to `SKILLS` in `sync_skills.sh` → run `build_index.py` (fills descriptions + marketplace entry) → set `category`/`tags` on the new marketplace entry → run `build_index.py` again → commit.

**Agent**: one `.md` per agent in `agents/`, Claude Code subagent format (frontmatter: `name`, `description`, optional `tools`, `model`). `build_index.py` picks it up automatically.

**Artifact / style**: folder or file under `artifacts/` / `styles/` per those READMEs; indexed by name automatically.

## Hygiene (repo may be public)

- Before committing, scan for secrets: `grep -rniE "(api[_-]?key|secret|token|password|BEGIN .* PRIVATE KEY)" plugins/ agents/ styles/` and check nothing personal (client names, unreleased work) is inside skill references.
- No `.DS_Store`, `__pycache__`, `dist/` in git (`.gitignore` covers them; `rsync` in the sync script excludes them).

## Release flow

1. Bump `plugin.json` versions where meaningful.
2. `python3 scripts/build_index.py`, commit, merge to `main`.
3. `git tag vX.Y.Z main && git push origin vX.Y.Z` — the `release-zips` workflow builds one zip per skill and attaches them to a GitHub release for claude.ai users. Never draft releases from the GitHub UI (it collides with the workflow).

## Validation before pushing

```bash
python3 scripts/build_index.py            # syncs manifests, regenerates, validates
python3 scripts/build_index.py            # second run must print the same and change nothing
python3 -m json.tool .claude-plugin/marketplace.json > /dev/null
bash scripts/package_skills.sh            # smoke-test zip build (output is gitignored)
```
