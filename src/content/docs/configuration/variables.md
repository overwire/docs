---
title: variables.yml
description: "Repository variables resolved by vars.* expressions."
---

A flat map of repository variables, exposed as `${{ vars.* }}` in expressions. Values may be strings, numbers, or booleans; all are coerced to strings, matching how the platform treats variables.

```yaml
NODE_VERSION: 20
DEPLOY_REGION: us-east-1
FEATURE_FLAG: true
```

A workflow referencing `${{ vars.NODE_VERSION }}` resolves it from this file. Undefined variables surface in pre-run validation before the run starts.

Environment-scoped variables live separately under [`environments/`](/configuration/environments/).
