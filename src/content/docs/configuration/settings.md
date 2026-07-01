---
title: settings.yml
description: "Repository owner and Overwire settings."
sidebar:
  order: 2
---

Core settings for one repository.

```yaml
owner: my-org

logs:
  plaintextSecrets: false

runner:
  allowHostMounts: false
  allowPrivileged: false

remote:
  token: ghp_xxxx
```

| Key | Description |
| --- | --- |
| `owner` | The organization or user owning this repo. Combined with the project folder name, it forms the `owner/repo` instance identity. Scaffolded by `overwire init` from the git remote; falls back to `local`. |
| `logs.plaintextSecrets` | Local troubleshooting override. Step output capture is redacted by default, even in live mode; set `true` to disable redaction for this repository only. |
| `runner.allowHostMounts` | Default `false`. Governs live Docker runs: when `false`, a job's `container` and `services` `volumes:` may only bind-mount host paths under the job workspace, tool cache, or Overwire directory. Any other host path (for example `/var/run/docker.sock` or `/`) is rejected. Set `true` only for a workspace whose workflows you trust. |
| `runner.allowPrivileged` | Default `false`. Governs live Docker runs: when `false`, `--privileged` in a job's `container.options` is ignored, and unsupported options such as `--cap-add` or `--device` raise an error instead of being silently dropped. Set `true` only for a workspace you trust. |
| `remote.token` | Token used for authenticated remote fetches (private actions and reusable workflows). Local-only; prefer leaving it unset and using the environment where possible. |

The `runner.*` flags are a security boundary for live Docker execution. They default to the safe option so that opening and running an unfamiliar repository's workflows cannot mount your filesystem or start privileged containers — enable them only for workspaces you trust.
