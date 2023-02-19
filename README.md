# vrfd.info Frontend Repository

## ERC20 address verification app.

[See user-manual](https://open-info.gitbook.io/verified-app/)

[Development build online.](https://vrfd.dev)

## Scripts
Install dependencies

- `pnpm i`

Run development server

- `pnpm dev`

Run uni tests (Vitest)

- `pnpm test`

Run component tests (Playwright)

- `pnpm test-ct`

Run e2e tests (Playwright)

- `pnpm test-e2e`

Build for production

- `pnpm build`

## Framework Features

Framework derived from @[Uninen](https://github.com/Uninen/vite-ts-tailwind-starter).
- Vite 3.1
- Vue 3.2
- Pinia store (fully typed Vuex store is available up to version 1.13)
- Routing using [vue-router 4](https://router.vuejs.org/)
- TypeScript 4.7
- PNPM
- Automatic package and component imports w/ [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) and [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- Tailwind CSS 3 w/ following plugins and configuration preinstalled:
  - `@tailwindcss/aspect-ratio`
  - `@tailwindcss/line-clamp`
  - `@tailwindcss/typography`
  - `@tailwindcss/forms`
  - `firefox`-variant
- PostCSS 8 w/ `postcss-nesting` plugin and `cssnano` for minimizing production CSS
- Eslint
- Prettier, with Volar recommended for VS Code
- Alias `@` to `<project_root>/src`
- Predefined and fully typed global variables:
  - `VITE_APP_VERSION` is read from `package.json` version at build time
  - `VITE_APP_BUILD_EPOCH` is populated as `new Date().getTime()` at build time
- Using newest `script setup` syntax w/ Ref sugar (see the official [Script Setup documentation](https://vuejs.org/api/sfc-script-setup.html) and [Ref Sugar RFC](https://github.com/vuejs/rfcs/discussions/369) discussion)
- Vitest unit tests
- Playwright e2e + component tests
- GitHub workflows
  - Renovatebot for keeping up with dependencies
  - Automated unit tests
  - Automated component tests
  - Automated e2e tests
- GitLab CI config available up to versions 2.x
