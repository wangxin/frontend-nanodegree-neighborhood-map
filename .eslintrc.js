module.exports = {
  "env": {
    "browser": true,
    "jquery": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-console": [
      "error",
      {
        allow: [
          "warn",
          "error"
        ]
      }
    ],
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "initMap"
      }
    ]
  },
  "globals": {
    "ko": false,
    "google": false
  }
};
