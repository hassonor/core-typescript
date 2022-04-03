module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended"
    ],
    rules: {
        "no-unused-vars": "off"
    },
    env: {
        browser: true,
        node: true
    }
}