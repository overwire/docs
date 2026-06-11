---
title: The config root
description: The flat .overwire/ directory is the source of truth for everything Overwire knows about a repository.
sidebar:
  order: 3
---

Config files are a source of truth, not a UI dump. Everything Overwire knows about a repository lives as plain files under a flat `.overwire/` directory: variables, secret declarations, step modes, mock contracts, payloads, rulesets, PR scenarios, and API mocks. The desktop app edits these files; it does not maintain a parallel store.

This page is being written. It will cover:

- The full directory layout and what is committable vs. local-only.
- How the CLI `--config-root` flag resolves project identity.
- The scaffolded `.gitignore` and secrets hygiene.

See the [configuration reference](/configuration/) for the per-file breakdown.
