---
title: Demo workspace
description: Ready-made demo workspaces that exercise every Overwire feature. Clone and explore.
---

[`overwire/demo`](https://github.com/overwire/demo) ships two demo workspaces: a single-repo free demo and a four-repo multi-repo workspace for Pro features. (Pro applies only to opening the multi-repo workspace in the desktop app — every CLI command below is free.) Every supported workflow feature has a runnable example somewhere inside: reusable workflows, matrices, services containers, environment protection, rulesets, pull request scenarios, and workflow chains.

## Get it

The desktop app ships with the single-repo demo built in — click **Try the demo** at the bottom of the start screen for a ready-to-run copy, no clone needed. To explore everything (or drive the demos from the CLI), clone the repository:

```sh
git clone https://github.com/overwire/demo.git
```

## Single-repo demo (free)

Open the `single-repo-demo/` directory in the desktop app, or run straight from the CLI — the `.overwire/` config ships fully populated, so there is nothing to initialize:

```sh
cd single-repo-demo
overwire run .github/workflows/ci.yml --config-root .overwire --event push
```

Two workflows are included:

- **ci.yml** — a build-and-report pipeline with checkout, setup-node, npm test, and a Markdown step summary.
- **env-and-expressions.yml** — exercises variables, secrets, and expression evaluation.

Pre-configured `.overwire/` files include variables, secrets, step modes, dispatch defaults, and event payloads.

## Multi-repo demo (Pro in the desktop app)

Open the `multi-repo-demo/` directory in the desktop app, or drive it from the CLI. The workspace peer registry (`.overwire/instances.yml`) ships checked in, so `overwire init --workspace` is only needed if you add repositories:

```sh
cd multi-repo-demo
```

Four repositories under two fictional organizations, `acme-corp` and `wire-corp`:

| Repository | What it shows |
| --- | --- |
| `starter-app` | A small CI workflow that calls a reusable workflow, chains job outputs, and writes a Markdown step summary. |
| `pipeline-app` | A full CI/CD pipeline. Static and dynamic matrices, concurrency, secrets, environment protection, services containers, releases, repository dispatch, and workflow chains. |
| `compliance-app` | Governance. Repository and org rulesets, CODEOWNERS, pre-staged pull request scenarios, check runs posted to the API mock, scheduled audits, and a merge queue trigger. |
| `enterprise-actions` | The shared producer repository: ten reusable workflows plus composite and Docker actions consumed by the other three. |

Org-level rulesets live in `.overwire/orgs/` at the workspace root and cascade onto each repository, the way organization admins enforce rules that repository admins cannot override.

## Things to try

**Run starter-app's CI.** The build job calls a reusable workflow that resolves locally from `enterprise-actions`, because both repositories are [workspace peers](/concepts/workspaces/):

```sh
overwire run starter-app/.github/workflows/ci.yml \
  --config-root starter-app/.overwire --event push
```

**Deploy with typed inputs and environment protection.** The deploy workflow takes a version, an environment choice, and a dry-run flag, and its deploy job waits on the staging environment's protection rules:

```sh
overwire run pipeline-app/.github/workflows/deploy.yml \
  --config-root pipeline-app/.overwire --event workflow_dispatch \
  --inputs '{"version":"2.0.0","environment":"staging","dry-run":"true"}'
```

**Evaluate pull request scenarios.** compliance-app pre-stages three pull requests: one passes every check, one is missing a required review, one has a failed security check. Open the Pull Requests page in the app to see the predicted merge outcome for each, or run the chain that drives CI and the compliance gate in sequence:

```sh
overwire chain compliance-app/.overwire/chains/pr-lifecycle.yml \
  --config-root compliance-app/.overwire
```

**Lint a deliberately bad workflow.** One workflow exists solely to trip the linter, with deprecated commands, duplicate step IDs, and an unpinned action:

```sh
overwire lint compliance-app/.github/workflows/bad-practices.yml
```

The multi-repo demo's [CLI-TEST-COMMANDS.md](https://github.com/overwire/demo/blob/main/multi-repo-demo/CLI-TEST-COMMANDS.md) is a command-by-command tour of the whole workspace; `./tour.sh` in the same directory runs the full recommended order as an asserted, mock-only smoke test.

## Mock by default

Every workflow in both demos defaults to mock mode, so everything runs without a container engine or network access. Live execution needs a Docker-API-compatible container engine (e.g., Docker Desktop, Colima, OrbStack, Rancher Desktop), and the first live `npm ci` needs registry access. Flip individual steps to live from the editor mode chips; see [step modes](/concepts/modes/) for how mode selection works.
