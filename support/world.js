const { chromium, firefox, webkit } = require("playwright");
const { setWorldConstructor, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(120 * 1000);

class CustomWorld {
  async openBrowser() {
    const browserType = (process.env.BROWSER || "chromium").toLowerCase();

    console.log("Launching browser:", browserType);

    // FIXED: Valid browser map
    const browserMap = {
      chromium,
      firefox,
      webkit
    };

    if (!browserMap[browserType]) {
      throw new Error(`Invalid browser selected: ${browserType}`);
    }

    this.browser = await browserMap[browserType].launch({
      headless: true
      
    });

    this.context = await this.browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: { dir: "reports/videos/" }
    });

    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    try {
      if (this.page) await this.page.close();
      if (this.context) await this.context.close();
      if (this.browser) await this.browser.close();
    } catch (err) {
      console.log("Error closing browser:", err);
    }
  }
}

setWorldConstructor(CustomWorld);
