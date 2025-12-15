const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const LoginPage = require("../../pages/LoginPage");
const { credentials } = require("../../config/testData");

let login;

/* ---------------------------
   OPEN LOGIN PAGE
---------------------------- */
Given("I open the Practice Test login page", async function () {
  login = new LoginPage(this.page);
  await login.openLoginPage();
});

/* ---------------------------
   LOGIN USING DYNAMIC DATA
---------------------------- */
When(
  "I login with username {string} and password {string}",
  async function (username, password) {
    await login.login(username, password);
  }
);

/* ---------------------------
   LOGIN USING STORED CREDENTIALS
---------------------------- */
When("I login with valid credentials", async function () {
  await login.login(
    credentials.validUser.username,
    credentials.validUser.password
  );
});

When("I login with invalid username", async function () {
  await login.login(
    credentials.invalidUser.username,
    credentials.invalidUser.password
  );
});

When("I login with invalid password", async function () {
  await login.login(
    credentials.invalidPassword.username,
    credentials.invalidPassword.password
  );
});

/* ---------------------------
   ASSERTIONS
---------------------------- */
Then("I should see the success message", async function () {
  await this.page.waitForSelector("h1", { timeout: 5000 });
  const msg = await this.page.textContent("h1");
  expect(msg).to.include("Logged In Successfully");
});

Then("I should see the error message", async function () {
  const msg = await login.getErrorMessage();
  expect([
    "Your username is invalid!",
    "Your password is invalid!",
  ]).to.include(msg.trim());
});
