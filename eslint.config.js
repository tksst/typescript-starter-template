const eslintConfig = require("@tksst/eslint-config").default;
const globals = require("globals");

module.exports = [
    {
        ignores: ["dist/**"],
    },
    {
        languageOptions: {
            globals: {
                // If your code runs on Node.js
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*.test.js"],
        languageOptions: {
            globals: {
                // If your test runs on Jest
                ...globals.jest,
            },
        },
    },
    ...eslintConfig,
];
