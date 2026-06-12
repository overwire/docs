---
title: Action support tiers
description: How Overwire satisfies a uses reference, native, live, mock, or unsupported.
sidebar:
  order: 5
---

A `uses:` step references an action capability, and Overwire is explicit about how it satisfies each one. Actions that depend on GitHub runner or platform services (checkout, cache, artifacts, OIDC tokens) are backed by native Overwire services. Generic actions run live in the container or mock against a contract. Anything unsupported fails with an actionable error instead of pretending.

## Three axes, not one

It is tempting to ask "is this action supported?" as a yes/no question. Overwire answers with three separate axes:

| Axis | Values | Who decides |
| --- | --- | --- |
| Execution mode | `skip`, `mock`, `live` | You, per step. See [step modes](/concepts/modes/). |
| Support provider | runner shell, Overwire service, action code, reusable workflow, mock contract, none | Overwire, by classifying the step |
| Support status | supported, needs configuration, unsupported | Overwire, given the provider and your config |

The same step can be `live` and fully supported, or `mock` and needs-configuration because its contract does not exist yet. Keeping the axes separate is what lets the app say precisely *why* a step is in the state it is, and what to do about it.

## Native services

Most actions are just code, and the right way to support them is to run them. The exception is actions that assume GitHub's runner infrastructure exists around them. For those, Overwire implements the platform service once and binds the action's inputs onto it:

- **Checkout** maps `actions/checkout` onto a git workspace service: local clones from workspace peers, token-authenticated remote clones, sparse checkout, submodules, LFS.
- **Cache** backs `actions/cache` and the cache API that `setup-*` actions call.
- **Artifacts** back `actions/upload-artifact` and `actions/download-artifact`.
- **OIDC** serves the token endpoint actions request ID tokens from.
- **Tool cache** persists tools installed by `setup-*` actions across runs; see [the runner page](/app/runner/).

Everything else (deploy actions, linters, vendor CLIs) runs live as real action code in the container, or mocks against a [contract](/concepts/mock-contracts/). Overwire does not re-implement third-party products.

## Reading the classification

Two surfaces show the same classification:

- [`overwire explain <workflow>`](/cli/explain/) prints the support matrix in the terminal.
- The [support plan tab](/app/runs-panel/) in the app shows it per step before a run, with inline mode buttons and contract links where configuration is the missing piece.

When something is genuinely unsupported, both say so and name the unsupported input or capability, so the failure happens before the run rather than as a silent wrong result inside it.
