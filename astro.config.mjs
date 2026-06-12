import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://docs.overwire.io",
  integrations: [
    starlight({
      title: "Overwire Docs",
      description:
        "Documentation for Overwire, a local workflow workbench. Run, mock, and debug your GitHub Actions workflow files locally.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/overwire/docs",
        },
      ],
      editLink: {
        baseUrl: "https://github.com/overwire/docs/edit/main/",
      },
      favicon: "/favicon.ico",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "icon",
            href: "/favicon.svg",
            type: "image/svg+xml",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
          },
        },
      ],
      customCss: [
        "@fontsource/geist-sans/400.css",
        "@fontsource/geist-sans/500.css",
        "@fontsource/geist-sans/600.css",
        "@fontsource/geist-sans/700.css",
        "@fontsource/geist-mono/400.css",
        "@fontsource/geist-mono/500.css",
        "./src/styles/theme.css",
      ],
      components: {
        Footer: "./src/components/Footer.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
      },
      sidebar: [
        {
          label: "Getting started",
          items: [
            "getting-started/installation",
            "getting-started/initialize",
            "getting-started/first-mock-run",
            "getting-started/first-live-run",
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
            "app/runner",
            "app/settings",
          ],
        },
        {
          label: "Platform",
          items: ["platform/directory-layout"],
        },
        {
          label: "Troubleshooting",
          items: ["troubleshooting", "troubleshooting/faq"],
        },
      ],
    }),
  ],
});
