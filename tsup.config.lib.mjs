/* eslint import/no-extraneous-dependencies: 0 */

import { libOptions } from "@tksst/typescript-starter-configs/tsup-config.mjs";
import { defineConfig } from "tsup";

import copyLicenses from "./scripts/copy-bundled-packages-licenses.mjs";

export default defineConfig({
    ...libOptions,
    entry: ["src/lib/index.ts"],

    // If you know that this library is for Node.js or for a browser, you may want to set the platform.
    // platform: "node",
    // platform: "browser",

    esbuildPlugins: [copyLicenses()],
});
