#!/usr/bin/env bash
# Pull the latest versions of the custom skills from this Mac's Claude app
# cache into the repo, then rebuild the indexes.
#
# The Claude desktop app syncs the account's skills to:
#   ~/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/<uuid>/<uuid>/skills/
# This script finds the most recently modified snapshot and copies each
# custom skill into its plugin (plugins/<skill>/skills/<skill>/). Anthropic
# built-ins (docx, pdf, pptx, xlsx, skill-creator, morning, schedule,
# setup-cowork, consolidate-memory) are intentionally NOT synced — they ship
# with Claude and are not ours.
#
# After editing a skill on claude.ai: run this, review `git diff`, commit.
set -euo pipefail
cd "$(dirname "$0")/.."

# The custom skills tracked in this repo (one plugin per skill, same name).
SKILLS=(
  fk-deck
  ophira-deck
  success-planner-deck
  business-case-research
  business-case-strategy
  business-case-activation
  comms-media-strategy
  campaign-development
  consent-based-ux-copywriting
)

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

for s in "${SKILLS[@]}"; do
  if [[ -d "$SRC/$s" ]]; then
    mkdir -p "plugins/$s/skills"
    rsync -a --delete --exclude=.DS_Store --exclude=__pycache__ "$SRC/$s" "plugins/$s/skills/"
    echo "  synced $s -> plugins/$s/skills/"
  else
    echo "  WARNING: $s not found in snapshot (skipped)" >&2
  fi
done

python3 scripts/build_index.py
echo "Now review with: git diff"
