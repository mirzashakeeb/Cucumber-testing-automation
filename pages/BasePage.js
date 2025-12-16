class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    console.log(` Navigating to URL: ${url}`);

    await this.page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    // Extra stabilization for WebKit
    console.log(" Waiting for network to become idle");
    await this.page
      .waitForLoadState("networkidle", { timeout: 60000 })
      .catch(() => {
        console.log(" networkidle wait skipped (safe to continue)");
      });

    console.log(" Page navigation completed");
  }

  async click(selector) {
    console.log(` Clicking element: ${selector}`);
    await this.page.click(selector);
  }

  async type(selector, text) {
    console.log(` Typing into element: ${selector}`);
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    console.log(` Getting text from element: ${selector}`);
    const text = await this.page.textContent(selector);
    console.log(` Retrieved text: "${text}"`);
    return text;
  }

  async waitForVisible(selector, timeout = 5000) {
    console.log(
      ` Waiting for element to be visible: ${selector} (timeout: ${timeout}ms)`
    );
    await this.page.waitForSelector(selector, {
      timeout,
      state: "visible",
    });
    console.log(` Element is visible: ${selector}`);
  }
}

module.exports = BasePage;
