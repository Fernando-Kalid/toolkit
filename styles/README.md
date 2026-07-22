# Styles

Style-sheets, design tokens, and brand systems — the visual layer, decoupled from any single skill or artifact.

None committed yet. Conventions for when they land:

- One folder per system: `styles/<system-name>/` (e.g. `styles/fk/`, `styles/ophira/`, `styles/success-planner/`) containing `tokens.css` (CSS custom properties), optional `tokens.json` (for robots/build tools), and a `README.md` stating fonts, palette, and usage rules.
- The deck skills in `plugins/fk-decks/` currently embed their own design systems; extracting shared tokens here is the intended evolution so skills, artifacts, and web properties consume one canonical definition per brand.

`scripts/build_index.py` indexes each folder automatically into `catalog.json`.
