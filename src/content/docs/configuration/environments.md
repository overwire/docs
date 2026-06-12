---
title: environments/
description: "Per-environment variables, secrets, and protection rules."
sidebar:
  order: 11
---

One directory per deployment environment: `environments/<name>/`, mirroring how `environment:` on a job scopes variables, secrets, and protection upstream.

```text
environments/
  staging/
    variables.yml
    secrets.yml
    protection.yml
```

| File | Description |
| --- | --- |
| `variables.yml` | Environment-scoped variables. Same flat-map format as the repository [`variables.yml`](/configuration/variables/); these win for jobs targeting the environment. |
| `secrets.yml` | Environment-scoped secrets. Same entry forms as the repository [`secrets.yml`](/configuration/secrets/). |
| `protection.yml` | Protection rules for approval gating. |

## `protection.yml`

```yaml
required_reviewers:
  - tyler
wait_timer: 0
auto_approve: false
```

| Key | Description |
| --- | --- |
| `required_reviewers` | List of reviewer logins. When non-empty, a job targeting the environment pauses until approved. |
| `wait_timer` | Minutes to wait before the job may proceed. |
| `auto_approve` | Approve automatically, useful for unattended CLI runs of protected workflows. |

In the desktop app, a run that hits a protection rule pauses and shows an approval dialog with the rules; approving resumes the run, rejecting fails the job, the same observable behavior as an environment gate upstream.

The app's [Repository → Environments section](/app/repository/) edits all three files per environment — protection rules, variables, and secrets — and can create or delete environment directories.
