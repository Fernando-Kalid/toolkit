# Agents

Standalone Claude Code **subagent** definitions — specialists you can delegate to (reviewers, researchers, domain experts).

None committed yet. This folder is scaffolding with conventions ready:

## Format

One `.md` file per agent, [Claude Code subagent format](https://docs.claude.com/en/docs/claude-code/sub-agents):

```markdown
---
name: brand-reviewer
description: Reviews copy and decks for FK/OPHIRA/Success Planner brand compliance. Use proactively after generating branded content.
tools: Read, Grep, Glob
---

You are the brand compliance reviewer. When invoked...
```

## Install

- Personal: copy the file into `~/.claude/agents/`
- Project: copy into `<project>/.claude/agents/`

## Indexing

`scripts/build_index.py` automatically picks up any `.md` here (except this README) and lists it in `catalog.json`, `llms.txt`, and the README catalog.
