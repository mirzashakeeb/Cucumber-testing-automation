const { Given, When, Then } = require("@cucumber/cucumber");
const TablePage = require("../../../pages/TablePage");

Given("I open the Practice Test Table page", async function () {
  this.tablePage = new TablePage(this.page);
  await this.tablePage.openTablePage();
});

// test case 1
When('I select language filter {string}', async function (language) {
  await this.tablePage.selectLanguageFilter(language);
});

Then('I count how many cells in column {int} contain {string}', async function (columnIndex, searchText) {
  const total = await this.tablePage.getTotalCellsInColumn(columnIndex);
  const matchCount = await this.tablePage.countCellsInColumnContaining(columnIndex, searchText);

  console.log(`Total rows = ${total}`);
  console.log(`Rows containing "${searchText}" = ${matchCount}`);
});

//test case 2
When('I uncheck level {string}', async function (levelName) {
  await this.tablePage.uncheckLevel(levelName);
});
Then('the level should contain {string}', async function (expected) {
    const result = await this.tablePage.verifyTextContains(expected);

    console.log(`It contains: "${expected}"`);

    if (!result) {
        throw new Error(`Text does not contain expected value: "${expected}"`);
    }
});

//test case 3
When('I open the filter dropdown', async function () {
    await this.tablePage.openLanguageDropdown();
});

When('I select the option {string}', async function (optionName) {
    await this.tablePage.selectEnlmtOption(optionName);
});
Then('I print the enrollment column name and all row values', async function () {
    await this.tablePage.printEnrollmentData();
});
