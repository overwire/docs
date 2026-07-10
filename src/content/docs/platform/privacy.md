---
title: Privacy & data handling
description: What runs locally, what can leave your machine, and how to turn each channel off.
---

Overwire is local-first: workflows, logs, secrets, mock contracts, and the entire run store live on your machine and are never uploaded. This page is the practical engineering view; the formal policy is at [overwire.io/privacy](https://overwire.io/privacy).

## What stays local

Everything you work with: workflow files, `.overwire/` config (including secret values, which never leave the machine), run records under `~/.cache/overwire/runs/`, logs, and captured API traffic. Mock-mode runs make no network connections at all.

## What can leave the machine

Three narrow channels exist, each with a defined trigger and off switch:

| Channel | When | What | Off switch |
| --- | --- | --- | --- |
| Crash reporting | Only after you make a choice in the first-launch consent dialog — nothing is sent before that. Packaged builds only. | Crash stack traces, app version, OS version. Home-directory paths are scrubbed. | Settings → Privacy |
| License validation | On activation, then periodic revalidation while Pro is active. | Your license key and an activation identifier, to Polar's license API. Transient network failures never deactivate you (14-day offline grace). | Don't activate a license (the CLI and free app surfaces never call it) |
| Update checks | The desktop app checks for updates. | A version query to the release server; no personal data. | Settings → Updates |

Live-mode runs additionally fetch what your workflows reference — action sources, container images, and whatever your steps download — exactly as CI would. That traffic is your workflow's, not telemetry.

## Diagnostic bundles

`overwire doctor --bundle` (or Settings → Support in the app) builds a support bundle **you** send — nothing is transmitted automatically. It contains environment info, a names-and-sizes-only file inventory, and failed-step run summaries, with home-directory paths scrubbed. Inspect the archive before sharing it; see [Troubleshooting](/troubleshooting/).
