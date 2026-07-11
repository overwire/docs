---
title: Installation
description: Install the Overwire desktop app and CLI.
---

Overwire ships as a desktop app with a scriptable CLI companion. Both run the same engine.

## macOS

Download the DMG for your architecture (Apple silicon or Intel) from [overwire.io](https://overwire.io/#download), drag Overwire to Applications, and open it. The app is signed and notarized.

## Windows

Download the installer for 64-bit Windows from [overwire.io](https://overwire.io/#download) and run it. The installer is signed, installs machine-wide to `C:\Program Files\Overwire`, and Windows asks for administrator approval during installation and when applying app updates.

While a new release builds download reputation, Microsoft SmartScreen may interpose "Windows protected your PC" on first run. Select **More info**, check the named publisher, and choose **Run anyway**.

For live runs on Windows, the container engine runs on WSL 2 (e.g., Docker Desktop with its WSL 2 backend) — see Live execution below.

## CLI (any platform with Node.js)

The CLI requires **Node.js 20 or newer**. Install it from npm:

```sh
npm install -g overwire
```

Verify the environment once installed:

```sh
overwire doctor
```

`doctor` checks your Node version, container engine reachability, and the `.overwire/` config tree, and tells you exactly what is missing for live runs.

## Live execution (optional)

Live step execution needs a **Docker-API-compatible container engine** (e.g., Docker Desktop, Colima, OrbStack, Rancher Desktop). Mock runs, parsing, linting, and simulation work without one.

## Next step

[Initialize a project](/getting-started/initialize/) to scaffold the `.overwire/` config tree.
