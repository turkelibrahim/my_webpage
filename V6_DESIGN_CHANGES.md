# V6 — Actual layout redesign

- Removed the oversized vertical portrait from the first-screen hero.
- Rebuilt the homepage hero as a compact text/profile split; portrait rendered in a 300×220 landscape frame.
- Moved selected public projects directly after Home to make the portfolio content visible earlier.
- Replaced the old navigation logo with the full-name wordmark.
- Reordered navigation to match section order.
- Added an active-section pill and progress rail with a live current-section label.
- Rewrote anchor scroll behavior to use one header-offset calculation; browser back/forward hash navigation restored.
- Applied distinct restrained section backgrounds: sage, blue-grey, sand, lilac and warm neutral.
- Redesigned project, skill, experience, certificate and contact cards for a clear dashboard hierarchy.
- Preserved public repository links, CV, certificates, SEO metadata and existing form fallback.
- Excluded the project the user asked to keep private.

## Test notes

- JavaScript syntax check and static production build pass.
- HTML section IDs and navigation targets are validated in the packaging script.
- Browser-driven visual and click-through tests are not available in this execution environment; verify the provided local preview at port 5175 before publishing.
