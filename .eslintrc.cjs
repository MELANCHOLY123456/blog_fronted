{
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "no-debugger": "warn"
  },
  "ignorePatterns": [
    "dist/",
    "node_modules/"
  ]
}