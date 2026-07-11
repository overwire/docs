---
title: Troubleshooting
description: Diagnose environment problems with doctor, decode every Overwire error class, and share a redacted diagnostic bundle.
---

## Start with doctor

```sh
overwire doctor
```

`doctor` checks your Node version (the CLI needs Node 20+), container engine reachability, and the `.overwire/` config tree, and reports exactly what live runs are missing. `overwire doctor capabilities` breaks down feature support in detail.

Every surfaced error carries a classified label (the headings below), the original message, and one guidance line. In `--json` mode the same classification arrives as a machine-readable `error.kind` — see [AI agents](/automation/ai-agents/) for the envelope.

## Install & first launch

### macOS blocks the app on first open

Overwire is signed and notarized, so Gatekeeper normally shows a standard confirmation. If macOS reports the app "can't be checked for malicious software", the download was likely interrupted or altered — re-download the DMG from [overwire.io](https://overwire.io/#download). Right-click → Open bypasses the prompt only for apps you deliberately trust; you should not need it for Overwire.

### File or directory not found

A path in your command or config doesn't exist — check the spelling and the working directory. Run commands take paths relative to where you run them; `--config-root` points at the `.overwire/` directory itself.

## Workflow & config errors

### Workflow file problem

The workflow YAML failed to parse or validate. Overwire mirrors GitHub's parsing rules, so the same file would fail on GitHub — fix the reported line in the workflow. `overwire lint <file>` and [`overwire validate`](/cli/validate/) find these before a run does.

### Expression problem

A `${{ }}` expression failed to parse or evaluate. Correct the expression; in the desktop app, the expression debugger in the step detail panel evaluates candidates against the run's real context.

### Action reference problem

A `uses:` reference could not be resolved — check the `owner/repo@ref` spelling (or the path, for local actions), or switch the step to mock mode with a contract so resolution isn't needed.

### Mock contract problem

A contract under `.overwire/mocks/` is malformed or doesn't satisfy the action's declared inputs. Fix or recreate it — see [mock contracts](/concepts/mock-contracts/). The app's support plan panel links to contract creation for each step.

### Configuration problem

A file under `.overwire/` failed to load. The message names the file; every format has a published schema (`overwire schema --list`) and the scaffolded files carry `$schema` headers your editor can validate against.

### A mocked step fails on inputs

The action's `action.yml` declares a required input the step does not provide. This mirrors how the step would fail upstream; fix the workflow or the mock contract.

### Pre-run validation blocks a run

Validation catches undefined secrets, missing required inputs, and dependency cycles before execution. Use `overwire run --force` to bypass it deliberately.

## Docker & live runs

### Container engine unavailable

Live steps need a running Docker-API-compatible container engine (Docker Desktop, Colima, OrbStack, Rancher Desktop). Start it and retry — mock-mode runs never need it. `overwire doctor` shows what Overwire can reach.

### Container operation failed

The engine is reachable but an operation failed mid-run. Check the runner image and the engine's state; the app's Runner page shows image status and can re-pull.

### Runner image missing

Pull the runner image before running live steps: from the app's Runner page, or `docker pull overwireio/runner`.

### Live `npm ci` or action fetches fail

Live runs fetch action sources and whatever your steps download, so registry/proxy problems surface exactly as they would in CI. Check network access from containers; corporate proxies must be configured in the container engine, not just the host shell.

## Licensing

### Activation fails

Activation needs network access to Polar's license API and a free slot (a seat covers 3 devices — deactivate an old machine to free one). The exact message says which it is. Transient network failures after activation never deactivate you: Pro holds through a 14-day offline grace. See [Licensing and purchases](/concepts/licensing/).

## Run outcomes that aren't errors

### Cancelled

The run or step was interrupted — by you, a signal, or fail-fast matrix cancellation. Start it again when ready; `overwire run` exits non-zero so scripts don't mistake an interrupted run for a pass.

### Not allowed

A deliberate policy refusal, not a malfunction — for example, editing the built-in demo's sample files. The message carries the full explanation.

## Unexpected error

Anything Overwire can't classify is reported as its own bug. Export a diagnostic bundle and [file an issue](https://github.com/overwire/feedback/issues/new/choose) with it attached.

## Reporting bugs and requesting features

Bug reports and feature requests live at [github.com/overwire/feedback](https://github.com/overwire/feedback) — the app's Help menu links there too. License, billing, and refund questions go to [contact@overwire.io](mailto:contact@overwire.io) instead (never post license keys in an issue).

## Diagnostic bundles

When reporting an issue, attach a diagnostic bundle:

```sh
overwire doctor --bundle
```

The bundle is redacted by design: it contains a names-and-sizes inventory of your config tree, environment facts, and failed-step run summaries. Secret values and file contents are never included, and home directory paths are scrubbed. The desktop app exports the same bundle from Settings → Data or Help → Export Diagnostic Bundle.
