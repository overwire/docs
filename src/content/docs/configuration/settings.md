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

remote:
  token: ghp_xxxx
```

| Key | Description |
| --- | --- |
| `owner` | The organization or user owning this repo. Combined with the project folder name, it forms the `owner/repo` instance identity. Scaffolded by `overwire init` from the git remote; falls back to `local`. |
| `logs.plaintextSecrets` | Local troubleshooting override. Step output capture is redacted by default, even in live mode; set `true` to disable redaction for this repository only. |
| `remote.token` | Token used for authenticated remote fetches (private actions and reusable workflows). Local-only; prefer leaving it unset and using the environment where possible. |
