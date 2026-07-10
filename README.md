# Overwire Docs

Documentation for [Overwire](https://overwire.io), a local workflow workbench. Run, mock, and debug your `.github/workflows` files locally before pushing.

This repository is the source for [docs.overwire.io](https://docs.overwire.io). All documentation is plain Markdown under `src/content/docs/`, readable directly on GitHub or rendered on the docs site.

## Contributing

Found an error or something unclear? Open an issue. Documentation fixes via pull request are welcome.

## Development

The site is built with [Astro Starlight](https://starlight.astro.build). Content lives as plain Markdown under `src/content/docs/`.

```sh
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
```

## Notices

This site bundles the Geist and Geist Mono typefaces, licensed under the SIL Open Font License 1.1. The license text ships at [`public/licenses/geist-ofl.txt`](public/licenses/geist-ofl.txt).

## License

Copyright © 2026 Overwire. All rights reserved.

<!-- Canonical disclaimer — must match the overwire.io footer exactly. -->
Overwire is compatible with GitHub Actions workflow files. Overwire is not affiliated with, endorsed by, or sponsored by GitHub, Inc. "GitHub" and "GitHub Actions" are trademarks of GitHub, Inc.
