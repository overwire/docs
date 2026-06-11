---
title: FAQ
description: Frequently asked questions about Overwire.
---

## Does Overwire need Docker?

Only for live step execution, and it requires a Docker-API-compatible container engine rather than Docker specifically: Docker Desktop, Colima, OrbStack, and Rancher Desktop all work. Parsing, linting, simulation, and fully mocked runs need no container engine at all.

## Does Overwire modify my workflow files?

No. Workflow YAML and `action.yml` files are read-only to Overwire. Step modes, mock contracts, and every other piece of Overwire state live in sidecar files under `.overwire/`.

## How accurate is local execution?

Matching real GitHub Actions semantics is the core engineering requirement: events, contexts, expressions, step ordering, and status behavior are implemented against the platform's documented behavior, and drift is treated as a bug. Where something is not supported, Overwire says so explicitly rather than approximating silently.

## Do my secrets leave my machine?

No. Secret values resolve from `.overwire/secrets.yml` or your environment, stay local, and are excluded from git by the scaffolded ignore rules. Step output capture is redacted by default, even in live mode.

## Is Overwire affiliated with GitHub?

No. Overwire is compatible with GitHub Actions workflow files. Overwire is not affiliated with, endorsed by, or sponsored by GitHub, Inc., Microsoft Corporation, or Docker, Inc.
