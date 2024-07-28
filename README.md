# typescript-starter-template

A template project for javascript library (for browsers or Node.js) and/or executable for Node.js.

## npm scripts

### `pnpm lint`

- Static analysis of code with [ESLint](https://eslint.org/)
- Code format checking with [Prettier](https://prettier.io)
- Type checking of TypeScript with [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- Credential checking with [secretlint](https://github.com/secretlint/secretlint)

### `pnpm fix`

(if modifiable) Code fixes by ESLint and Prettier

### `pnpm build`

- Build library entry points for both ESM and CJS by [tsup](https://tsup.egoist.sh/)
- Build an executable that runs in ESM mode by tsup

### `pnpm test`

Testing by [Vitest](https://vitest.dev/)

### `pnpm watch`

Watching mode of `build`

## Note about Vitest

Sometimes the [test hangs due to problems outside of Vitest](https://github.com/vitest-dev/vitest/issues/2008#issuecomment-1871066901). In that case, it can be fixed by vitest.config.ts with `pool: "forks"`.

## scripts for project starter

There are scripts in the `scripts' directory to customize a new project.

Once the project is started, these scripts should be deleted.

## changesets

This template is almost ready for using [changesets](https://github.com/changesets/changesets).
To enable changesets for releasing to npm registry:

- add `NPM_TOKEN` to Actions secrets of the repository
- modify [`.github/workflows/release.yml`](.github/workflows/release.yml) to enable the release workflow
- modify [`.github/workflows/build-test.yml`](.github/workflows/release.yml)
- modify [`.changeset/config.json`](.changeset/config.json) if you are using a default branch name other than `main`.
- modify [`.prettierignore`](.prettierignore) to ignore `CHANGELOG.md` and `pre.json` with prettier
- allow GitHub Actions to create Pull Request. [See this image.](https://github.com/tksst/typescript-starter-template/blob/4f0f98caf9ee49d86e34986e2c15a5346167cd26/workflow-permissions-about-pull-requests.webp?raw=true)
- (Optional) install [changeset-bot](https://github.com/apps/changeset-bot)

## Note about ts-node or something

This template does not mention [ts-node](https://typestrong.org/ts-node/), [esbuild-register](https://github.com/egoist/esbuild-register), [tsx](https://github.com/esbuild-kit/tsx) or other similar software.

The current versions of them do not act in the same way as the official TypeScript compiler.

ts-node and esbuild-register have a different import resolution mechanism from the tsc and will not run if you use `.js` extension in the import statement.

tsx is somewhat better than these, but I saw that it does not work well when importing CommonJs from ESM.
