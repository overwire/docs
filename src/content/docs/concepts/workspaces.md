---
title: Workspaces and instances
description: How Overwire models repositories, owners, and multi-repo workspaces.
sidebar:
  order: 2
---

A workspace is the directory you open. It may contain a single repository or many peer repositories listed in `.overwire/instances.yml`. Each repository is an instance with an `owner/repo` identity derived from its `settings.yml` owner and folder name.

This page is being written. It will cover:

- Workspace root vs. project root vs. config root.
- How `instances.yml` lists peers by relative path and why that keeps workspaces portable.
- Instance identity rules and the `local` owner fallback.
- How cross-repo reusable workflow references resolve against workspace peers.
