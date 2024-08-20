module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    camelcase: ['error', { properties: 'always' }],
    'no-var': 'error',
    'no-multiple-empty-lines': ['error', {'max': 1}],
    'no-multi-spaces': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }]
    // 'prettier/prettier': ['error']
  },
}
