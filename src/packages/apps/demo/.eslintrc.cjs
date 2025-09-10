const path = require('path');

module.exports = {
  extends: [
    path.resolve(__dirname, '../../../.eslintrc.cjs'),
    'plugin:react/recommended',
    'plugin:react-perf/all'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
