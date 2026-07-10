---
title: Changelog
description: What shipped in each Overwire release.
---

<!-- Source of truth is overwire.io src/lib/releases.ts — update both together. -->

Release notes for the desktop app. Downloads for every version: [overwire.io](https://overwire.io/#download). The CLI is versioned independently on npm and is not covered here.

## 1.0.1 — 2026-07-09

A friendlier first launch, with a built-in demo. (macOS)

**Added**

- Built-in demo: open a sample workspace with ready-to-run workflows straight from the start screen — no setup or Docker needed
- Demo workspaces are view-and-execute: run workflows and flip step modes freely while the sample files stay pristine
- Exit the demo from the status bar; removing a workspace's last repository now closes it back to the start screen

**Improved**

- First launch lands directly on the start screen, which explains what to open and that workflow files are never modified
- Opening a single repository sets it up automatically — the manual initialize step is gone
- Crash-reporting consent waits until after you open something

**Fixed**

- Reopening a workspace whose repository list had been emptied no longer dead-ends on the setup screen

## 1.0.0 — 2026-07-03

First stable release. (macOS)

**Added**

- Mocked steps narrate their contract match, validated inputs, outputs, and declared duration in the step log

**Improved**

- Lifetime licenses include every update; the update window and renewal are gone
- The update control sits beside the app version in the status bar
- The wordmark matches the brand across the app

## 0.9.1 — 2026-07-02

(macOS)

**Added**

- Welcome dialog that orients first launches before setup
- Data settings: open the app's directories, clear the cache, or reset app data

**Fixed**

- The system keychain is only accessed when you switch secret storage
- Cmd+Q always quits cleanly, even mid-teardown

## 0.9.0 — 2026-07-01

First public release. (macOS)

- Workflow workbench: open a repository and run its GitHub Actions workflows locally
- Per-step modes: skip, mock, or live-execute each step in a real runner container
- Platform simulation for events, contexts, and the GitHub API
- Companion CLI, installable from npm
