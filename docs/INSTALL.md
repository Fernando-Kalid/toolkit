# Installing skills from this toolkit

Every skill here is a standard [Agent Skill](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview): a folder with a `SKILL.md` (plus optional references/assets). Skills auto-trigger when your request matches their description — you don't "run" them, you just ask Claude for the thing they do.

Pick the path for where you use Claude:

## 1. Claude Code — via the plugin marketplace (recommended)

Works in the CLI, desktop app, and IDE extensions. (Claude Code **on the web** doesn't support `/plugin` commands — see section 2 for the routes that work there.) Each skill is its own plugin, so you install exactly the ones you want. Inside a Claude Code session, add the marketplace once:

```
/plugin marketplace add Fernando-Kalid/toolkit
```

Then install any skill by name (`/plugin install <skill>@fk-toolkit`):

```
/plugin install fk-deck@fk-toolkit
/plugin install ophira-deck@fk-toolkit
/plugin install success-planner-deck@fk-toolkit
/plugin install business-case-research@fk-toolkit
/plugin install business-case-strategy@fk-toolkit
/plugin install business-case-activation@fk-toolkit
/plugin install comms-media-strategy@fk-toolkit
/plugin install campaign-development@fk-toolkit
/plugin install consent-based-ux-copywriting@fk-toolkit
```

(Want everything? Paste the whole block — each line is independent.)

Check what's installed with `/plugin`. Get updates later with:

```
/plugin marketplace update fk-toolkit
```

## 2. Claude Code on the web (claude.ai/code)

Web sessions run in ephemeral cloud sandboxes: the `/plugin` commands aren't available there, and plugins installed on your machine don't carry over. Two routes that do work:

- **Pin the marketplace in the repo you work on** — commit the settings block from section 5 (Teams) to that repo's `.claude/settings.json`. Web sessions on that repo will prompt to install the declared plugins.
- **Commit the skill directly into your repo** — the zero-machinery option. Skills at `.claude/skills/` load automatically in every session on that repo (web, CLI, desktop, IDE), no installation step:

```bash
git clone https://github.com/Fernando-Kalid/toolkit.git
mkdir -p your-project/.claude/skills
cp -R toolkit/plugins/fk-deck/skills/fk-deck your-project/.claude/skills/
```

Commit the folder and every collaborator — and every web session — gets the skill.

## 3. claude.ai and the Claude apps — via zip upload

1. Grab the zip for the skill you want from the [latest GitHub release](../../../releases/latest). (No release yet, or want the bleeding edge? Clone the repo and run `bash scripts/package_skills.sh` — zips appear in `dist/skills/`.)
2. In Claude go to **Settings → Capabilities** (skills require the file-creation / code-execution capability to be enabled).
3. Under **Skills**, choose **Upload skill** and select the zip.
4. The skill now triggers automatically in your chats when relevant.

Note: upload availability depends on your plan (Pro/Max/Team/Enterprise).

## 4. Claude Code — manual copy (no marketplace)

```bash
git clone https://github.com/Fernando-Kalid/toolkit.git
# available in every session on THIS machine:
cp -R toolkit/plugins/fk-deck/skills/fk-deck ~/.claude/skills/
# or committed to one project (works everywhere, including web sessions):
cp -R toolkit/plugins/fk-deck/skills/fk-deck your-project/.claude/skills/
```

## 5. Teams — preload via checked-in settings

For a team repo where everyone runs Claude Code, you can pin the marketplace and plugins in the project's `.claude/settings.json` so teammates get prompted to install them automatically:

```json
{
  "extraKnownMarketplaces": {
    "fk-toolkit": {
      "source": { "source": "github", "repo": "Fernando-Kalid/toolkit" }
    }
  },
  "enabledPlugins": {
    "business-case-research@fk-toolkit": true,
    "business-case-strategy@fk-toolkit": true,
    "business-case-activation@fk-toolkit": true
  }
}
```

## 6. API / Agent SDK

Skills also work with the Claude API (code-execution container) and the Claude Agent SDK — upload the skill folder or point the SDK at it. See the [Agent Skills docs](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) for the current mechanics.

## Troubleshooting

- **Skill doesn't trigger** — it activates on matching requests, not by name-typing (in Claude Code you *can* invoke it explicitly with `/skill-name`). Ask for the outcome the skill's description promises.
- **Installed but not listed** — in Claude Code run `/plugin` to inspect; restart the session after installing. On claude.ai check Settings → Capabilities shows the skill enabled.
- **Zip rejected on upload** — the zip must contain the skill folder at its root (e.g. `fk-deck/SKILL.md`). Zips from `scripts/package_skills.sh` and the GitHub releases already have this shape.
