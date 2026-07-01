---
title: Installation
description: Install the Overwire desktop app and CLI.
sidebar:
  order: 1
---

Overwire ships as a macOS desktop app with a scriptable CLI companion. Both run the same engine.

:::note
Overwire is in pre-release. Download links go live at launch on [overwire.io](https://overwire.io/#download).
:::

## Requirements

- **macOS** (Apple silicon or Intel) for the desktop app.
- **A Docker-API-compatible container engine** (e.g., Docker Desktop, Colima, OrbStack, Rancher Desktop) for live step execution. Mock runs, parsing, linting, and simulation work without one.
- **Node.js** for the CLI.

## Desktop app

Download the DMG for your architecture from [overwire.io](https://overwire.io/#download), drag Overwire to Applications, and open it. The app is signed and notarized.

## CLI

Install the CLI from npm:

```sh
npm install -g overwire
```

Verify the environment once installed:

```sh
overwire doctor
```

`doctor` checks your Node version, container engine reachability, and the `.overwire/` config tree, and tells you exactly what is missing for live runs.

## Next step

[Initialize a project](/getting-started/initialize/) to scaffold the `.overwire/` config tree.
