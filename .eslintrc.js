module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [
    "import",
    "react",
  ],
  "settings": {
    "react": {
      "version": "detect"
    },
    "import/extensions": [".jsx", ".js"]
  },
  "rules": {
    "linebreak-style": "off", // It's off because it's set to unix by airbnb but git handles the conversion to and from unix<->windows
    "comma-dangle": "off", // looks bad in code but looks better in git diffs, use if you want to
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
    "react/jsx-one-expression-per-line": 0, // enforce this on case-by-case
    "react/jsx-props-no-spreading": 0,
    "react/prefer-stateless-function": 0,
    "import/extensions": 0,
    "no-console": ["error", { allow: ["warn", "error"]}]
  }
};
