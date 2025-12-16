module.exports = {
  default: {
    require: [
      "features/step-definitions/**/*.js",
      "support/hooks.js",
      "support/world.js"
    ],
    paths: ["features/**/*.feature"],
    format: [
      "progress",
      "html:reports/cucumber-report.html"
    ],
    publishQuiet: true
  }
};
