module.exports = {
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "node": true,
    "mocha": true,
    "mongo": true
  },
  "extends": "google",
  "rules": {
    "no-tabs": "error",
    "indent": ["error", 2, {"SwitchCase": 1}],
    "no-console": "error",
    "no-loop-func": "error",
    "no-bitwise": "error",
    "no-else-return": "error",
    "max-len": ["error", {"code": 120, "tabWidth": 2, "ignoreUrls": true, "ignorePattern": "^goog.(module|require)"}],
    "no-constant-condition": "error",
    "strict": ["error"],
    "eqeqeq": ["error"],
    "keyword-spacing": ["error"],
    "space-infix-ops": "error",
    "quotes": [1, "single"]
  }
};
