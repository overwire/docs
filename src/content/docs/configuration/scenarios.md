---
title: pull-requests.yml and statuses.yml
description: "Local PR scenarios and external commit statuses or check runs."
sidebar:
  order: 9
---

These two files describe platform state that workflows and merge prediction consume: pull requests that "exist" and statuses that "already happened". JSON Schemas: [`pull-requests`](/schemas/pull-requests.schema.json) and [`statuses`](/schemas/statuses.schema.json), also printable offline with [`overwire schema`](/cli/schema/).

## `pull-requests.yml`

Local pull request scenarios under a single `pullRequests:` list. Scenarios drive:

- `pull_request` event simulation: the payload reflects the scenario PR.
- Merge prediction against [rulesets](/configuration/governance/): review requirements and required checks evaluate against the scenario's reviews and the statuses below.
- The desktop app's pull requests page.

### Pull request fields

| Field | Description |
| --- | --- |
| `number` | PR number (required). |
| `id`, `state`, `title`, `draft`, `merged` | Optional identity and lifecycle fields; `state` is `open` or `closed`. |
| `action` | The `pull_request` event action the scenario simulates. |
| `base`, `head` | Refs (required). Each carries `ref` plus optional `sha`, `repository` (for forks), `lastPusher`, and `lastPushedAt`. |
| `changedFiles` | File paths the PR touches; feeds CODEOWNERS and path filters. |
| `reviews` | Submitted reviews (below). |
| `conversations` | Review threads: `id`, `resolved`, optional `outdated`, `path`, `line`. Feeds required-conversation-resolution rules. |

### Review fields

| Field | Description |
| --- | --- |
| `user` | Reviewer login (required). |
| `state` | `APPROVED`, `CHANGES_REQUESTED`, `COMMENTED`, `DISMISSED`, or `PENDING` (lowercase accepted). |
| `codeOwner` | Marks the review as satisfying code-owner requirements. |
| `stale` | Marks the review stale, as a later push would on the platform. |
| `id`, `body`, `submittedAt`, `commitSha` | Optional metadata. |

```yaml
pullRequests:
  - number: 10
    title: "feat: add caching layer"
    base: { ref: main }
    head: { ref: feat/cache, sha: abc1234 }
    changedFiles: [src/core/cache.js]
    reviews:
      - user: lead-dev
        state: APPROVED
        codeOwner: true
```

## `statuses.yml`

External commit statuses and check runs that exist independently of your local runs, the way a third-party CI or scanner would report them upstream. Two lists: `statuses:` (classic commit statuses) and `checks:` (check runs). Every entry targets a commit through exactly one of `ref`, `sha`, or `pr`.

### Commit status fields

| Field | Description |
| --- | --- |
| `context` | Status context name (required). |
| `state` | `error`, `failure`, `pending`, or `success` (required). |
| `description`, `targetUrl`, `id`, `createdAt`, `updatedAt` | Optional metadata. |

### Check run fields

| Field | Description |
| --- | --- |
| `name` | Check name (required). |
| `status` | `queued`, `in_progress`, `completed`, `waiting`, `requested`, or `pending`. Defaults to `completed`. |
| `conclusion` | Required when completed: `success`, `failure`, `skipped`, `neutral`, `cancelled`, `timed_out`, `action_required`, `stale`, `error`, `pending`, or `startup_failure`. |
| `summary`, `detailsUrl`, `id`, `startedAt`, `completedAt` | Optional metadata. |

```yaml
statuses:
  - pr: 10
    context: security/scan
    state: success
checks:
  - pr: 10
    name: license-check
    conclusion: success
```

Seeding a required context here lets merge prediction resolve required checks that your local workflows do not produce themselves. The desktop app edits both files as plain files; nothing is hidden in app state.
