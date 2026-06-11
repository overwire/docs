---
title: Action support tiers
description: How Overwire satisfies a uses reference, native, live, mock, or unsupported.
sidebar:
  order: 5
---

A `uses:` step references an action capability, and Overwire is explicit about how it satisfies each one. Actions that depend on GitHub runner or platform services (checkout, cache, artifacts, OIDC tokens) are backed by native Overwire services. Generic actions run live in the container or mock against a contract. Anything unsupported fails with an actionable error instead of pretending.

This page is being written. It will cover:

- Execution mode vs. support provider vs. support status, and why they are different axes.
- The native service bindings: checkout, cache, artifacts, OIDC, tool cache.
- Reading the support plan panel and `overwire explain` output.
