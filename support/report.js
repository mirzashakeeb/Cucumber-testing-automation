const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./reports/json",
  reportPath: "./reports/html",
  metadata: {
    device: "Local Machine",
    platform: {
      name: "Windows",
      version: "10"
    }
  }
});
