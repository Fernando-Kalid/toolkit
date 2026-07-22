#!/usr/bin/env bash
# Pull the latest versions of the custom skills from this Mac's Claude app
# cache into the repo, then rebuild the indexes.
#
# The Claude desktop app syncs the account's skills to:
#   ~/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/<uuid>/<uuid>/skills/
# This script finds the most recently modified snapshot and copies each
# custom skill into its bundle. Anthropic built-ins (docx, pdf, pptx, xlsx,
# skill-creator, morning, schedule, setup-cowork, consolidate-memory) are
# intentionally NOT synced — they ship with Claude and are not ours.
#
# After editing a skill on claude.ai: run this, review `git diff`, commit.
set -euo pipefail
cd "$(dirname "$0")/.."

SRC=$(find "$HOME/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin" \
  -maxdepth 3 -type d -name skills 2>/dev/null | while read -r d; do
    printf '%s\t%s\n' "$(stat -f %m "$d")" "$d"
  done | sort -rn | head -1 | cut -f2-)

if [[ -z "${SRC:-}" ]]; then
  echo "ERROR: no skills snapshot found under ~/Library/Application Support/Claude/" >&2
  echo "Open the Claude desktop app once so it syncs your account skills, then retry." >&2
  exit 1
fi
echo "Syncing from: $SRC"

# skill -> bundle mapping (keep in step with .claude-plugin/marketplace.json)
sync() { # $1 = skill name, $2 = bundle name
  if [[ -d "$SRC/$1" ]]; then
    rsync -a --delete --exclude=.DS_Store --exclude=__pycache__ "$SRC/$1" "plugins/$2/skills/"
    echo "  synced $1 -> plugins/$2/skills/"
  else
    echo "  WARNING: $1 not found in snapshot (skipped)" >&2
  fi
}

sync fk-deck                      fk-decks
sync ophira-deck                  fk-decks
sync success-planner-deck         fk-decks
sync business-case-research       business-case
sync business-case-strategy       business-case
sync business-case-activation     business-case
sync comms-media-strategy         comms-studio
sync campaign-development         comms-studio
sync consent-based-ux-copywriting comms-studio

python3 scripts/build_index.py
echo "Now review with: git diff"
