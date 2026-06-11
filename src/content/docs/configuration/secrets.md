---
title: secrets.yml
description: "Secret declarations, optionally with local-only values."
sidebar:
  order: 4
---

Secret declarations for `${{ secrets.* }}`. Each entry takes one of three forms:

```yaml
# Declared, no value: resolves from your environment at run time
NPM_TOKEN:

# Literal value (local-only)
DEPLOY_KEY: "***local-value***"

# Full form
SENTRY_DSN:
  description: Crash reporting DSN for the staging project
  required: true
  value: "***local-value***"
```

## Resolution order

At run time a secret resolves from the file value first, then from `process.env`. A required secret with no value anywhere fails pre-run validation.

## Values never leave your machine

- The scaffolded `.overwire/.gitignore` ignores `secrets.yml`, so values stay out of git.
- Step output capture is redacted by default, even in live mode.
- The desktop app warns when a `secrets.yml` holding literal values would be committable, and offers to fix the ignore rule. It can also store values encrypted in the OS keychain instead of the file (Settings).
- The renderer process of the desktop app never sees plaintext values, only name and has-value metadata.
