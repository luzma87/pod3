# Working agreement for pod3

Notes on how we work together on this project, kept here (instead of
private agent memory) so they're visible and versioned alongside the code.

## Process

- **Incremental changes**: land changes in small, testable slices rather
  than large batches, so you can check in on real behavior often instead
  of reviewing one big change at the end.
- **No assumptions**: if a requirement, design detail, or edge case isn't
  specified, ask rather than guessing/picking silently.
- **Tests written proactively**: add tests for new logic as it's written,
  without waiting to be asked. See `PLAN.md`'s Testing section for the
  intended stack (Vitest + React Testing Library).

## Git

- Only read-only/debugging git commands are run on your behalf: `status`,
  `diff`, `log`, and similar inspection commands.
- Staging, committing, and pushing are handled by you, not run
  automatically as part of finishing a task.

## Verification

- UI-visible changes are not checked by driving a browser
  (Playwright/claude-in-chrome). Instead, each change comes with a short
  list of manual steps for you to check yourself, and you report back if
  something looks wrong.

## Where things live

- `PLAN.md` — architecture and tech decisions for the rewrite, kept up to
  date as we go.
- `docs/workflow.md` (this file) — how we collaborate.
- Additional `docs/*.md` files get added per topic as needed (e.g. a
  gotchas/troubleshooting log), rather than growing one big file.
