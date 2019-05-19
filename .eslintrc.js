module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'airbnb',
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    "prefer-destructuring": ["error", {
      "array": false,
      "object": true
    }, {
      "enforceForRenamedProperties": false
    }]
  },
  parserOptions: {
    "ecmaVersion": 6,
    parser: 'babel-eslint'
  }
}
