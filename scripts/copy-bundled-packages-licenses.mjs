import fs from "node:fs/promises";
import path from "node:path";

// eslint-disable-next-line import/no-extraneous-dependencies
import { readPackageUp } from "read-pkg-up";

const defaultOptions = {
    directoryPath: "./LICENSE-DEPENDENCIES/",
    searchNames: ["LICENSE", "LICENCE", "NOTICE"],
    includePrivate: false,
};

async function copyFiles(srcDir, targetDir, searchNames) {
    await fs.mkdir(targetDir, { recursive: true });

    const files = await fs.readdir(srcDir);

    for (const file of files) {
        if (searchNames.find((it) => file.startsWith(it)) !== undefined) {
            // eslint-disable-next-line no-await-in-loop
            await fs.copyFile(path.join(srcDir, file), path.join(targetDir, file), fs.constants.COPYFILE_FICLONE);
        }
    }
}

export default (options = {}) => ({
    name: "copy-bundled-packages-licenses",
    async setup(build) {
        const thisPkg = await readPackageUp();

        const dependencies = new Map();

        const {
            includePrivate,
            directoryPath: targetDir,
            searchNames,
        } = {
            ...defaultOptions,
            ...options,
        };

        build.onLoad({ filter: /.?/ }, async ({ path: asdf }) => {
            const result = await readPackageUp({ cwd: asdf });

            if (
                result !== undefined &&
                result.path !== thisPkg?.path &&
                (includePrivate || result.packageJson.private !== true)
            ) {
                dependencies.set(result.path, result.packageJson);
            }

            return undefined;
        });

        build.onEnd(async () => {
            // no bundled packages, do not make the target directory
            if (dependencies.size === 0) {
                return;
            }

            await fs.mkdir(targetDir, { recursive: true });

            for (const [k, v] of dependencies) {
                // eslint-disable-next-line no-await-in-loop
                await copyFiles(path.dirname(k), path.join(targetDir, `${v.name}@${v.version}`), searchNames);
            }
        });
    },
});
