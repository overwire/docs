---
title: api-mocks.yml
description: "Declarative GitHub API mock routes with capture and suggest."
sidebar:
  order: 10
---

Declarative mock routes for the local GitHub API server. Steps inside the container talk to the injected `GITHUB_API_URL`, so workflow code calling the API hits your mocks instead of the network.

```yaml
routes:
  - method: GET
    path: /repos/{owner}/{repo}/releases/latest
    response:
      status: 200
      body: { tag_name: v2.3.1 }

  # Flat shorthand: status/headers/body at the route level
  - method: POST
    path: /repos/{owner}/{repo}/statuses/{sha}
    status: 201
```

| Key | Description |
| --- | --- |
| `method` | HTTP method. Case-insensitive. |
| `path` | REST path pattern. Placeholders like `{owner}` match any segment. |
| `request` | Optional matcher: `query`, `headers`, `body`, or `graphql.operationName`. |
| `response.status` / `response.headers` / `response.body` | The canned response. With the flat shorthand, `status`, `headers`, and `body` sit directly on the route. |
| `id` | Optional identifier for tooling. |

## Capture and suggest

Requests that match no route are captured to `.overwire/state/api-requests.json`, and ready-to-paste route suggestions are written to `.overwire/state/api-mocks.suggested.yml`. Run summaries in both the CLI and the desktop app show matched and unmatched API calls, so mocks earn their way in from real workflow needs.

## Stateful endpoints

A small set of endpoint families is stateful rather than canned: issue and PR comments, commit statuses and check runs, Actions artifacts, and the Actions cache. Workflows exercising those get real create-then-read behavior locally without any route declarations.
