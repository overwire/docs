---
title: First live run
description: Execute workflow steps for real inside the Overwire runner container.
---

Live mode executes steps inside a runner container that Overwire manages. Workflow commands never run directly on your machine: the host plans, schedules, and observes; the container executes.

## Requirements

A Docker-API-compatible container engine (e.g., Docker Desktop, Colima, OrbStack, Rancher Desktop) must be running. Check with:

```sh
overwire doctor
```

## Run with a container

```sh
overwire run .github/workflows/ci.yml --docker
```

Live steps execute in the `overwireio/runner` image, one container per job. JavaScript, composite, and Docker actions are fetched at run time by your machine and staged into the container.

You can mix modes freely: set the deploy steps to `mock`, keep build and test `live`, and skip what you do not need. See [step modes](/concepts/modes/) for how mode selection works.

## Secrets stay protected

Step output capture is redacted by default, even in live mode, so secret values do not leak into logs. Secret values resolve from `.overwire/secrets.yml` or your environment and are local-only.

## In the desktop app

The workbench shows the same run on the DAG canvas: jobs and steps update as they execute, with logs streaming in the run panel. The Runner page manages the runner image, including pulling and version checks.

## Next step

Want a playground with every feature already wired up? Clone the [demo workspace](/getting-started/demo/).
