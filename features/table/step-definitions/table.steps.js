const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const TablePage = require("../../../pages/TablePage");

Given("I open the Practice Test Table page", async function () {
  this.tablePage = new TablePage(this.page);
  await this.tablePage.openTablePage();
});

/* -------- Test Case 1 -------- */
When('I select language filter {string}', async function (language) {
  await this.tablePage.selectLanguageFilter(language);
});

Then(
  'I count how many cells in column {int} contain {string}',
  async function (columnIndex, searchText) {
    const count = await this.tablePage.countCellsInColumnContaining(
      columnIndex,
      searchText
    );
    expect(count).to.be.greaterThan(0);
  }
);

/* -------- Test Case 2 -------- */
When('I uncheck level {string}', async function (levelName) {
  await this.tablePage.uncheckLevel(levelName);
});

Then('the level should contain {string}', async function (expected) {
  const result = await this.tablePage.verifyTextContains(expected);
  expect(result).to.equal(true);
});

/* -------- Test Case 3 -------- */
When('I open the filter dropdown', async function () {
  await this.tablePage.openLanguageDropdown();
});

When('I select the option {string}', async function (optionName) {
  await this.tablePage.selectEnlmtOption(optionName);
});

Then('I print the enrollment column name and all row values', async function () {
  await this.tablePage.printEnrollmentData();
});
