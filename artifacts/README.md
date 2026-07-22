# Artifacts

Self-contained HTML/Markdown artifacts worth keeping and re-sharing — dashboards, calculators, visual reports, interactive pages built with Claude.

None committed yet. Conventions for when they land:

- One folder per artifact: `artifacts/<artifact-name>/` containing `index.html` (fully self-contained: inline CSS/JS, no external requests) plus an optional `README.md` with context and the live claude.ai URL if published.
- Kebab-case names, same as skills.
- Nothing private: artifacts here are meant to be forked and reused by others.

`scripts/build_index.py` indexes each folder automatically into `catalog.json`.
