# .github

Organization-wide defaults. Every repo in the org without its own templates gets these automatically.

- `.github/ISSUE_TEMPLATE/` — Task and Bug issue forms. Features, events, and Phases are generated with `docs/workflow/scripts/create-tasks.mjs` in each Game Repo.
- `.github/PULL_REQUEST_TEMPLATE.md` — PR template with the Definition of Done.
- `labels.json` — the studio's standard labels. Labels are not inherited; sync them:

```sh
node scripts/sync-labels.mjs <owner/repo>
node scripts/sync-labels.mjs --org <org>
```

- `profile/README.md` — the org's public profile page.

The process behind all of this lives in the `roblox-workflow` repo.
