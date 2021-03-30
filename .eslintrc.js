module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: ['svelte3'],
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'no-console': 2,
    'no-alert': 2,
    'no-debugger': 2,
    'eqeqeq': 2,
    'no-extra-parens': 2,
    'default-case-last': 2,
    'guard-for-in': 2,
    'no-empty-function': 2,
    'no-eq-null': 2,
    'no-extend-native': 2,
    'no-iterator': 2,
    'no-lone-blocks': 2,
    'no-magic-numbers': 2,
    'no-multi-str': 2,
    'no-new': 2,
    'no-new-wrappers': 2,
    'no-proto': 2,
    'no-self-compare': 2,
    'no-useless-concat': 2,
  },
}
