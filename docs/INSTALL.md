# Installing skills from this toolkit

Every skill here is a standard [Agent Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview): a folder with a `SKILL.md` (plus optional references/assets). Skills auto-trigger when your request matches their description — you don't "run" them, you just ask Claude for the thing they do.

Pick the path for where you use Claude:

## 1. Claude Code — via the plugin marketplace (recommended)

Works in the CLI, desktop app, and IDE extensions. Inside a Claude Code session:

```
/plugin marketplace add Fernando-Kalid/toolkit
```

Then install the bundle(s) you want:

```
/plugin install fk-decks@fk-toolkit
/plugin install business-case@fk-toolkit
/plugin install comms-studio@fk-toolkit
```

Check what's installed with `/plugin`. Get updates later with:

```
/plugin marketplace update fk-toolkit
```

## 2. claude.ai and the Claude apps — via zip upload

1. Grab the zip for the skill you want from the [latest GitHub release](../../../releases/latest). (No release yet, or want the bleeding edge? Clone the repo and run `bash scripts/package_skills.sh` — zips appear in `dist/skills/`.)
2. In Claude go to **Settings → Capabilities** (skills require the file-creation / code-execution capability to be enabled).
3. Under **Skills**, choose **Upload skill** and select the zip.
4. The skill now triggers automatically in your chats when relevant.

Note: upload availability depends on your plan (Pro/Max/Team/Enterprise).

## 3. Claude Code — manual copy (no marketplace)

```bash
git clone https://github.com/Fernando-Kalid/toolkit.git
# available in every session:
cp -R toolkit/plugins/fk-decks/skills/fk-deck ~/.claude/skills/
# or only in one project:
cp -R toolkit/plugins/fk-decks/skills/fk-deck your-project/.claude/skills/
```

## 4. Teams — preload via checked-in settings

For a team repo where everyone runs Claude Code, you can pin the marketplace and plugins in the project's `.claude/settings.json` so teammates get prompted to install them automatically:

```json
{
  "extraKnownMarketplaces": {
    "fk-toolkit": {
      "source": { "source": "github", "repo": "Fernando-Kalid/toolkit" }
    }
  },
  "enabledPlugins": { "business-case@fk-toolkit": true }
}
```

## 5. API / Agent SDK

Skills also work with the Claude API (code-execution container) and the Claude Agent SDK — upload the skill folder or point the SDK at it. See the [Agent Skills docs](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) for the current mechanics.

## Troubleshooting

- **Skill doesn't trigger** — it activates on matching requests, not by name-typing (in Claude Code you *can* invoke it explicitly with `/skill-name`). Ask for the outcome the skill's description promises.
- **Installed but not listed** — in Claude Code run `/plugin` to inspect; restart the session after installing. On claude.ai check Settings → Capabilities shows the skill enabled.
- **Zip rejected on upload** — the zip must contain the skill folder at its root (e.g. `fk-deck/SKILL.md`). Zips from `scripts/package_skills.sh` and the GitHub releases already have this shape.
