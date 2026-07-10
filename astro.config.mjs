import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { sidebar } from "./src/sidebar.mjs";

export default defineConfig({
  site: "https://docs.overwire.io",
  integrations: [
    starlight({
      title: "Overwire Docs",
      editLink: {
        baseUrl: "https://github.com/overwire/docs/edit/main/",
      },
      lastUpdated: true,
      description:
        "Documentation for Overwire, a local workflow workbench. Run, mock, and debug your GitHub Actions workflow files locally.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/overwire/docs",
        },
      ],
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
        {
          tag: "meta",
          attrs: { property: "og:image", content: "https://docs.overwire.io/og.png" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:width", content: "1200" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:height", content: "630" },
        },
        {
          tag: "meta",
          attrs: { name: "twitter:card", content: "summary_large_image" },
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
      sidebar,
    }),
  ],
});
