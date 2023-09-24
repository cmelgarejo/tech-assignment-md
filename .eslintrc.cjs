/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  root: true,
  rules: {
    "prettier/prettier": "error",
  },
};
