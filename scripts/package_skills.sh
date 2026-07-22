#!/usr/bin/env bash
# Package every skill into its own zip for upload on claude.ai
# (Settings → Capabilities → Skills → Upload skill).
#
# Output: dist/skills/<skill-name>.zip — each zip contains the skill folder
# at its root (e.g. fk-deck/SKILL.md), which is the format claude.ai expects.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf dist/skills
mkdir -p dist/skills

count=0
for skill in plugins/*/skills/*/; do
  name=$(basename "$skill")
  parent=$(dirname "$skill")
  (cd "$parent" && zip -qr "../../../dist/skills/$name.zip" "$name" \
    -x "*.DS_Store" -x "*__pycache__*" -x "*.pyc")
  count=$((count + 1))
  echo "packaged dist/skills/$name.zip"
done

echo "Done: $count skill zips in dist/skills/"
