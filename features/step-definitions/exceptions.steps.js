const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const ExceptionsPage = require("../../pages/ExceptionsPage");

let exceptions;

/* ---------------- COMMON ---------------- */
Given("I open the Test Exceptions page", async function () {
  exceptions = new ExceptionsPage(this.page);
  await exceptions.openPage();
});

/* ---------------- TEST CASE 1 ---------------- */
When("I click the Add button", async function () {
  await exceptions.clickAddButton();
});

Then("Row 2 input field should be displayed", async function () {
  await exceptions.waitForRow2();
  const visible = await this.page.isVisible("(//button[@id='save_btn'])[2]");
  expect(visible).to.equal(true);
});

/* ---------------- TEST CASE 2 ---------------- */
When("I wait for Row 2 input to appear", async function () {
  await exceptions.waitForRow2();
});

When('I type "Hello123" into Row 2 input field', async function () {
  await exceptions.typeInRow2("Hello123");
});

When("I click the visible Save button", async function () {
  await exceptions.clickVisibleSave();
});

Then("I should see the saved confirmation", async function () {
  const msg = await exceptions.getSavedMessageRow1();
  expect(msg).to.include("Row 2 was saved");
});

/* ---------------- TEST CASE 3 ---------------- */
When("I click the Edit button", async function () {
  await exceptions.clickEditButton();
});

When("I clear Row 1 input field", async function () {
  await exceptions.clearRow1Input();
});

When('I type "mirza" into Row 1 input field', async function () {
  await exceptions.typeRow1("mirza");
});

When("I click the Save button", async function () {
  await exceptions.clickVisibleSave();
});

Then("I should see the Row 1 saved message", async function () {
  const msg = await exceptions.getSavedMessageRow1();
  expect(msg).to.include("Row 1 was saved");
});

/* ---------------- TEST CASE 4 ---------------- */
When("I capture the instructions text element", async function () {
  this.instructions = this.page.locator("#instructions");
  expect(await this.instructions.isVisible()).to.equal(true);
});

When("I click the Add button for stale test", async function () {
  await this.page.click("#add_btn");
});

Then("The instructions text element should disappear", async function () {
  await this.page.waitForSelector("#instructions", {
    state: "detached",
    timeout: 5000
  });
  const count = await this.page.locator("#instructions").count();
  expect(count).to.equal(0);
});

/* ---------------- TEST CASE 5 ---------------- */
When("I wait only 3 seconds for Row 2 input", async function () {
  try {
    await this.page.waitForSelector("#row2 input", {
      timeout: 3000,
      state: "visible"
    });
  } catch (error) {
    this.timeoutError = error;
  }
});

Then("Row 2 input should NOT be displayed within 3 seconds", async function () {
  expect(this.timeoutError).to.not.equal(undefined);
});
