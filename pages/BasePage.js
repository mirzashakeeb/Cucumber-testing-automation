class BasePage {
  constructor(page) {
    this.page = page;
  }

async navigate(url) {
  await this.page.goto(url, {
    waitUntil: "domcontentloaded",
    timeout: 60000
  });

  // Extra stabilization for WebKit
  await this.page.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
}

  async click(selector) {
    await this.page.click(selector);
  }

  async type(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async waitForVisible(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout, state: "visible" });
  }
}

module.exports = BasePage;
