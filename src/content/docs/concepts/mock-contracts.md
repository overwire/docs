---
title: Mock contracts
description: YAML sidecars that declare expected inputs and synthesized outputs for mocked actions.
sidebar:
  order: 4
---

A mock contract is a YAML file in `.overwire/mocks/` describing how a mocked `uses:` step behaves: which inputs it expects and which outputs it returns. Overwire resolves the action's real `action.yml`, validates required inputs at run time, and synthesizes the declared outputs, so downstream expressions like `${{ steps.x.outputs.y }}` keep working.

This page is being written. It will cover:

- Contract file naming and matching.
- Generating contracts with `overwire seed-mocks`, including from a completed run.
- Editing contracts in the desktop app.
- How required-input validation mirrors real action behavior.
