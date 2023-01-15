/* eslint import/no-extraneous-dependencies: 0 */

import { binOptions } from "@tksst/typescript-starter-configs/tsup-config.mjs";
import { defineConfig } from "tsup";

import copyLicenses from "./scripts/copy-bundled-packages-licenses.mjs";

export default defineConfig({
    ...binOptions,
    entry: ["src/bin/index.ts"],
    esbuildPlugins: [copyLicenses()],
});
