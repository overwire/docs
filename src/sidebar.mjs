// Single source of truth for the docs reading order. astro.config.mjs builds
// the Starlight sidebar from this, and scripts/build-llms-txt.mjs derives the
// llms.txt / llms-full.txt ordering from the same array — edit here and both
// stay in sync by construction.
export const sidebar = [
  {
    label: "Getting started",
    items: [
      "getting-started/installation",
      "getting-started/initialize",
      "getting-started/first-mock-run",
      "getting-started/first-live-run",
      "getting-started/demo",
    ],
  },
  {
    label: "Concepts",
    items: [
      "concepts/modes",
      "concepts/workspaces",
      "concepts/config-root",
      "concepts/mock-contracts",
      "concepts/support-tiers",
      "concepts/runs",
      "concepts/licensing",
    ],
  },
  {
    label: "CLI reference",
    collapsed: true,
    items: [
      "cli",
      "cli/init",
      "cli/doctor",
      "cli/parse",
      "cli/list",
      "cli/lint",
      "cli/explain",
      "cli/simulate",
      "cli/run",
      "cli/chain",
      "cli/resolve",
      "cli/seed-mocks",
      "cli/status",
      "cli/history",
      "cli/cache",
      "cli/validate",
      "cli/schema",
      "cli/agents",
      "cli/license",
    ],
  },
  {
    label: "Configuration reference",
    collapsed: true,
    items: [
      "configuration",
      "configuration/settings",
      "configuration/variables",
      "configuration/secrets",
      "configuration/modes",
      "configuration/mocks",
      "configuration/payloads",
      "configuration/governance",
      "configuration/scenarios",
      "configuration/chains",
      "configuration/custom-properties",
      "configuration/api-mocks",
      "configuration/environments",
      "configuration/instances",
      "configuration/state-and-cache",
    ],
  },
  {
    label: "App guide",
    collapsed: true,
    items: [
      "app/workbench",
      "app/runs-panel",
      "app/editors",
      "app/pull-requests",
      "app/repository",
      "app/runner",
      "app/settings",
    ],
  },
  {
    label: "Automation",
    items: ["automation/ai-agents"],
  },
  {
    label: "Platform",
    items: ["platform/directory-layout", "platform/uninstall", "platform/privacy"],
  },
  {
    label: "Troubleshooting",
    items: ["troubleshooting", "troubleshooting/faq"],
  },
];
