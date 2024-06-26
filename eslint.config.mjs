import eslintPluginAstro from "eslint-plugin-astro"
import eslintPluginUnicorn from "eslint-plugin-unicorn"

export default [
  eslintPluginUnicorn.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-strict"],
  {
    rules: {
      "unicorn/prefer-module": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
]
