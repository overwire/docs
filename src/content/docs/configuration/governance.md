---
title: rulesets.json
description: "Branch rulesets in GitHub's native export format."
sidebar:
  order: 8
---

Branch rulesets in the platform's native ruleset export format. Export a ruleset from your repository settings upstream and drop the JSON here; Overwire evaluates the same rules locally.

- `rulesets.json` holds the primary ruleset.
- `github/rulesets/*.json` holds any number of additional exported rulesets.

Rulesets feed two surfaces:

1. **Merge prediction.** PR scenarios from [`pull-requests.yml`](/configuration/scenarios/) are evaluated against required status checks, review requirements, and other rules to predict whether a merge would pass.
2. **Pre-push validation.** The pull requests page in the desktop app shows which rules pass and which block, before anything reaches the platform.

Because the format is the native export, the file round-trips: nothing Overwire-specific is added, and re-exporting from upstream after a rules change is a copy-paste update.

## Organization-level rulesets

A [workspace](/concepts/workspaces/) can simulate the rules an organization admin would enforce across repositories. Org rulesets live at the **workspace** config root, keyed by organization name:

```text
<workspace>/.overwire/orgs/<org>/rulesets.json
<workspace>/.overwire/orgs/<org>/github/rulesets/*.json
```

The files use the same native export format. Rules from `orgs/<org>/` cascade onto every workspace repository owned by that organization and evaluate alongside the repository's own rulesets, mirroring how organization rules apply on the platform without repository admins being able to override them. Ruleset `conditions` (such as `repository_name`) narrow which repositories a rule targets.

The [demo workspace](/getting-started/demo/) ships a working example: two fictional organizations with org-level signed-commit and review requirements layered over per-repository rules.

## CODEOWNERS

CODEOWNERS evaluation reads your repository's `CODEOWNERS` file directly; changed files are scenario input.
