const { Before, After, AfterStep } = require("@cucumber/cucumber");
const fs = require("fs");

Before(async function () {
  await this.openBrowser();
  this.page = await this.context.newPage(); 
});

AfterStep(async function ({ result }) {
  if (result.status === "failed") {
    if (!fs.existsSync("./reports/screenshots")) {
      fs.mkdirSync("./reports/screenshots", { recursive: true });
    }
    await this.page.screenshot({
      path: `./reports/screenshots/${Date.now()}.png`
    });
  }
});

After(async function () {
  await this.closeBrowser();
});
