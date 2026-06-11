---
title: pull-requests.yml and statuses.yml
description: "Local PR scenarios and external commit statuses or check runs."
sidebar:
  order: 9
---

These two files describe platform state that workflows and merge prediction consume: pull requests that "exist" and statuses that "already happened".

## `pull-requests.yml`

Local pull request scenarios. Each entry describes a PR: number, title, base and head refs (with optional SHA, repository, and last-pusher details), draft state, labels, assignees, requested reviewers, and submitted reviews with states like `APPROVED` or `CHANGES_REQUESTED`.

Scenarios drive:

- `pull_request` event simulation: the payload reflects the scenario PR.
- Merge prediction against [rulesets](/configuration/governance/): review requirements and required checks evaluate against the scenario's reviews and the statuses below.
- The desktop app's pull requests page.

## `statuses.yml`

External commit statuses and check runs that exist independently of your local runs, the way a third-party CI or scanner would report them upstream.

Commit statuses carry a `context`, a `state` (`error`, `failure`, `pending`, `success`), and an optional description and target URL, attached to a `ref`, `sha`, or `pr`. Check runs carry a name, status (`queued`, `in_progress`, `completed`, ...), and conclusion (`success`, `failure`, `cancelled`, `timed_out`, and the other platform conclusions).

Seeding a required context here lets merge prediction resolve required checks that your local workflows do not produce themselves.

Detailed field references for both files are being expanded. The desktop app edits them as plain files; nothing is hidden in app state.
