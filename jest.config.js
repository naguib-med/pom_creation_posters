module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleFileExtensions: ["js", "json", "vue"],
  // transform: {
  //   "^.+\\.js$": "babel-jest",
  //   "^.+\\.vue$": "@vue/vue3-jest",
  // },
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "@vue/vue3-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!lib-to-transform|other-lib)"],
  moduleNameMapper: {
    "/^components/(.*)$/": "<rootDir>/src/components/$1",
    "/^views/(.*)$/": "<rootDir>/src/views/$1",

    "/^@/(.*)$/": "<rootDir>/src/$1",
  },
  globals: {
    "vue-jest": {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("v-"),
      },
    },
  },
};
