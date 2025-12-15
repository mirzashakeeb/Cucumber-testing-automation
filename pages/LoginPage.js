const BasePage = require("./BasePage");
const { urls } = require("../config/testData");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameField = "#username";
    this.passwordField = "#password";
    this.submitBtn = "#submit";
    this.error = "#error";
  }

  async openLoginPage() {
    await this.navigate(urls.LOGIN);
  }

  async login(username, password) {
    await this.type(this.usernameField, username);
    await this.type(this.passwordField, password);
    await this.click(this.submitBtn);
  }

  async getErrorMessage() {
    await this.waitForVisible(this.error);
    return await this.getText(this.error);
  }
}

module.exports = LoginPage;
