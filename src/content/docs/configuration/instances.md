---
title: instances.yml
description: "The workspace peer list for multi-repo workspaces."
---

Present only in a workspace-level `.overwire/`. A bare YAML list of the repositories in the workspace:

```yaml
- fullName: my-org/api
  relativePath: api
- fullName: my-org/web
  relativePath: web
- fullName: my-org/shared-workflows
  relativePath: shared-workflows
```

| Key | Description |
| --- | --- |
| `fullName` | The instance identity as `owner/repo`. Must match the identity derived from the child repo's `settings.yml` owner and folder name. |
| `relativePath` | Path from the workspace root to the child repo. Relative, so the workspace is portable across machines. A single-repo workspace uses `.`. |

`overwire init --workspace` generates this file by auto-discovering child directories containing `.github/` or `.overwire/`. The desktop app's "Add repository" action appends entries.

Peers are equal: there is no primary repository. Cross-repo reusable workflow references resolve against peers before any remote fetch, and editor tabs in the desktop app are scoped per instance so same-named config files do not collide.
