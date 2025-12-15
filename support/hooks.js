const { Before, After, AfterStep } = require("@cucumber/cucumber");
const fs = require("fs");
const path = require("path");

Before(async function () {
  await this.openBrowser();
  this.page = await this.context.newPage();
});

AfterStep(async function ({ result, pickle }) {
  if (result.status === "FAILED") {
    const dir = path.join("reports", "screenshots");

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileName = `${pickle.name.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
    const filePath = path.join(dir, fileName);

    // Take screenshot as buffer
    const screenshot = await this.page.screenshot({
      path: filePath,
      fullPage: true,
    });

    //  Attach screenshot to Cucumber report
    await this.attach(screenshot, "image/png");
  }
});

After(async function () {
  await this.closeBrowser();
});
