---
title: custom-properties.yml
description: "Repository custom properties that surface in event payloads."
sidebar:
  order: 11
---

Repository custom properties — the key/value metadata an organization defines for its repositories (team ownership, compliance tier, data classification). On the platform these surface inside event payloads under `repository.custom_properties`; Overwire reads this file to do the same locally. JSON Schema: [`custom-properties`](/schemas/custom-properties.schema.json).

```yaml
# yaml-language-server: $schema=https://docs.overwire.io/schemas/custom-properties.schema.json
team: platform
compliance-tier: high
data-classification: internal
```

The file is a flat map of property name to string value. Workflows consume the values through the event payload:

```yaml
steps:
  - name: Gate on compliance tier
    if: github.event.repository.custom_properties.compliance-tier == 'high'
    run: ./run-extended-checks.sh
```

Ruleset `conditions` that target repository properties evaluate against the same values, so governance scenarios and the workflows they constrain stay consistent.
