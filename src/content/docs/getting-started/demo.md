---
title: Demo workspace
description: A ready-made four-repo workspace that exercises every Overwire feature. Clone it and explore.
sidebar:
  order: 5
---

[`overwire/demo`](https://github.com/overwire/demo) is a workspace of fictional repositories built to exercise Overwire end-to-end. Every supported workflow feature has a runnable example somewhere inside: reusable workflows, matrices, services containers, environment protection, rulesets, pull request scenarios, and workflow chains. It is the fastest way to see what Overwire can do before wiring up your own repositories.

## Get it

```sh
git clone https://github.com/overwire/demo.git
```

Open the cloned `demo` directory in the desktop app. The workspace's `.overwire/instances.yml` lists four repositories, so the sidebar shows them all as equal peers. From the CLI, run commands from the workspace root and point `--config-root` at the repository you want.

## What's inside

Four repositories under two fictional organizations, `acme-corp` and `wire-corp`:

| Repository | What it shows |
| --- | --- |
| `hello-app` | The first five minutes. A small CI workflow that calls a reusable workflow, chains job outputs, and writes a Markdown step summary. |
| `pipeline-app` | A full CI/CD pipeline. Static and dynamic matrices, concurrency, secrets, environment protection, services containers, releases, repository dispatch, and workflow chains. |
| `compliance-app` | Governance. Repository and org rulesets, CODEOWNERS, pre-staged pull request scenarios, check runs posted to the API mock, scheduled audits, and a merge queue trigger. |
| `enterprise-actions` | The shared producer repository: ten reusable workflows plus composite and Docker actions consumed by the other three. |

Org-level rulesets live in `.overwire/orgs/` at the workspace root and cascade onto each repository, the way organization admins enforce rules that repository admins cannot override.

## Things to try

**Run hello-app's CI.** The build job calls a reusable workflow that resolves locally from `enterprise-actions`, because both repositories are [workspace peers](/concepts/workspaces/):

```sh
overwire run hello-app/.github/workflows/ci.yml \
  --config-root hello-app/.overwire --event push
```

**Deploy with typed inputs and environment protection.** The deploy workflow takes a version, an environment choice, and a dry-run flag, and its deploy job waits on the staging environment's protection rules:

```sh
overwire run pipeline-app/.github/workflows/deploy.yml \
  --config-root pipeline-app/.overwire --event workflow_dispatch \
  --inputs '{"version":"2.0.0","environment":"staging","dry-run":"true"}'
```

**Evaluate pull request scenarios.** compliance-app pre-stages three pull requests: one passes every check, one is missing a required review, one has a failed security check. Open the Pull Requests page in the app to see the predicted merge outcome for each, or run the chain that drives CI and the compliance gate in sequence:

```sh
overwire chain run pr-lifecycle --config-root compliance-app/.overwire
```

**Lint a deliberately bad workflow.** One workflow exists solely to trip the linter, with deprecated commands, duplicate step IDs, and an unpinned action:

```sh
overwire lint compliance-app/.github/workflows/bad-practices.yml
```

The repository's [README](https://github.com/overwire/demo#readme) documents every flow and carries a capability matrix mapping each feature to the workflow that demonstrates it. [CLI-TEST-COMMANDS.md](https://github.com/overwire/demo/blob/main/CLI-TEST-COMMANDS.md) is a command-by-command tour of the whole workspace.

## Mock by default

Most workflows in the demo default to mock mode, so everything runs without a container engine or network access. Live execution needs a Docker-API-compatible container engine (e.g., Docker Desktop, Colima, OrbStack, Rancher Desktop), and the first live `npm ci` needs registry access. Flip individual steps to live from the editor mode chips; see [step modes](/concepts/modes/) for how mode selection works.
