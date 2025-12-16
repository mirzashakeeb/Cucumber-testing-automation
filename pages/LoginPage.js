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
    console.log(" Navigating to Login Page");
    await this.navigate(urls.LOGIN);
  }

  async login(username, password) {
    console.log(` Entering username: ${username}`);
    await this.type(this.usernameField, username);

    console.log(" Entering password");
    await this.type(this.passwordField, password);

    console.log(" Clicking Login button");
    await this.click(this.submitBtn);
  }

  async getErrorMessage() {
    console.log(" Waiting for error message");
    await this.waitForVisible(this.error);

    const errorText = await this.getText(this.error);
    console.log(` Error message displayed: "${errorText}"`);

    return errorText;
  }
}

module.exports = LoginPage;
