const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        chrome: "52",
        firefox: "44",
        safari: "7",
        explorer: "11",
      }
    },
  ],
];

module.exports = { presets };