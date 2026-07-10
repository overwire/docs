---
title: overwire simulate
description: "Print a simulated event payload, optionally wrapped in a full github context."
---

Prints the synthetic event payload Overwire would use for a given trigger, so you can see exactly what `${{ github.event.* }}` will contain before running anything.

```sh
overwire simulate [options] <event>
```

## Arguments

| Argument | Description |
| --- | --- |
| `event` | One of `push`, `pull_request`, `workflow_dispatch`, `repository_dispatch`, `schedule`, `release`, `create`, `delete`, `issues`, `issue_comment`, `merge_group`, `pull_request_review`. |

## Options

| Option | Description |
| --- | --- |
| `--repo <owner/name>` | Repository identity (default `overwire-local/repo`). |
| `--ref <ref>` | Git ref, e.g. `refs/heads/main` or `refs/tags/v1.0.0`. |
| `--actor <login>` | Actor / sender login. |
| `--pr-number <n>` | `pull_request` number. |
| `--pr-action <action>` | `pull_request` action (`opened`, `closed`, `synchronize`, ...). |
| `--base-ref <ref>` | `pull_request` base branch. |
| `--head-ref <ref>` | `pull_request` head branch. |
| `--inputs <json>` | `workflow_dispatch` inputs as a JSON object. |
| `--event-type <name>` | `repository_dispatch` event type. |
| `--client-payload <json>` | `repository_dispatch` `client_payload` as a JSON object. |
| `--schedule <cron>` | `schedule` cron expression. |
| `--tag-name <tag>` | `release` tag name. |
| `--release-action <action>` | `release` action (`published`, `created`, ...). |
| `--ref-type <type>` | `create`/`delete` ref type (`branch` or `tag`). |
| `--issue-number <n>` | `issues`/`issue_comment` issue number. |
| `--issue-action <action>` | `issues` action (`opened`, `closed`, `labeled`, ...). |
| `--comment-action <action>` | `issue_comment` action (`created`, `edited`, `deleted`). |
| `--comment-body <text>` | `issue_comment` body text. |
| `--merge-group-action <action>` | `merge_group` action (`checks_requested`, `destroyed`). |
| `--review-action <action>` | `pull_request_review` action (`submitted`, `edited`, `dismissed`). |
| `--review-state <state>` | `pull_request_review` state (`approved`, `changes_requested`, `commented`, `dismissed`). |
| `--review-body <text>` | `pull_request_review` body text. |
| `--reviewer <login>` | `pull_request_review` reviewer login. |
| `--with-context` | Wrap the payload in a full `github.*` context. |

## Examples

```sh
overwire simulate push --ref refs/heads/main
overwire simulate pull_request --pr-number 42 --base-ref main --head-ref feature/x
overwire simulate repository_dispatch --event-type deploy --client-payload '{"env":"staging"}'
overwire simulate push --with-context | jq .github.ref_name
```

Saved payload overrides in `.overwire/payloads/<event>.json` take precedence at run time; `simulate` shows you the baseline the factories generate.
