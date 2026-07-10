---
title: overwire schema
description: "Print the JSON Schema for any .overwire/ config file format."
---

Prints the JSON Schema for a `.overwire/` config file format — the same schema the loader validates with at run time, so it can never drift from real behavior. Works offline and always matches the installed version.

```sh
overwire schema [options] [name]
```

## Arguments

| Argument | Description |
| --- | --- |
| `name` | Schema id, e.g. `modes`, `mock-contract`, `chain`. Omit (or pass `--list`) to list every id. |

## Options

| Option | Description |
| --- | --- |
| `--list` | List every available schema id with its file location. |
| `--json` | With `--list`, emit the index as JSON. |

## Published copies

Every schema is also served from this site at `/schemas/<id>.schema.json` (index at [`/schemas/index.json`](/schemas/index.json)). Reference them from YAML for editor validation and autocompletion:

```yaml
# yaml-language-server: $schema=https://docs.overwire.io/schemas/modes.schema.json
defaultMode: mock
```

Available ids: `settings`, `variables`, `secrets`, `modes`, `mock-contract`, `payload-override`, `dispatch-defaults`, `chain`, `pull-requests`, `statuses`, `api-mocks`, `environment-protection`, `custom-properties`, `instances`. Ruleset files (`rulesets.json`, `github/rulesets/`, `orgs/`) use GitHub's native ruleset export format and are deliberately not republished here.
