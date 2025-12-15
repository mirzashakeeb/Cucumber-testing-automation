const BasePage = require("./BasePage");
const { urls } = require("../config/testData");

class TablePage extends BasePage {
  constructor(page) {
    super(page);

    // ---------- TABLE ----------
    this.table = "//tbody";
    this.languageColumn = (index) => `//tbody/tr/td[${index}]`;

    // ---------- LANGUAGE FILTER ----------
    this.languageRadio = (lang) => this.page.getByLabel(lang);

    // ---------- LEVEL FILTER ----------
    this.levelCheckbox = (level) => this.page.getByLabel(level);

    // ---------- DROPDOWN ----------
    this.dropdown = this.page.locator("//div[@role='button']");
    this.dropdownOption = (name) =>
      this.page.locator(`//li[normalize-space()='${name}']`);

    // ---------- ENROLLMENTS ----------
    this.enrollmentHeader = this.page.getByRole("columnheader", {
      name: "Enrollments",
    });
    this.enrollmentCells = "//tbody/tr/td[5]";
  }

  /* ---------- PAGE ---------- */
  async openTablePage() {
    await this.navigate(urls.TABLE);
    await this.waitForTableToLoad();
  }

  async waitForTableToLoad() {
    await this.page.waitForSelector(this.table, {
      state: "visible",
      timeout: 15000,
    });
  }

  /* ---------- TEST CASE 1 ---------- */
  async selectLanguageFilter(language) {
    await this.languageRadio(language).check();
    await this.waitForTableToLoad();
  }

  async countCellsInColumnContaining(columnIndex, searchText) {
    const locator = this.page.locator(
      `//tbody/tr/td[${columnIndex}]`,
      searchText ? { hasText: searchText } : {}
    );
    return await locator.count();
  }

  /* ---------- TEST CASE 2 ---------- */
  async uncheckLevel(levelName) {
    await this.levelCheckbox(levelName).uncheck();
    await this.waitForTableToLoad();
  }

  async verifyTextContains(expectedText) {
    const cell = this.page.locator(
      "//tbody/tr[not(contains(@style,'display:none'))]/td[4]"
    ).first();

    await cell.waitFor({ state: "visible", timeout: 15000 });
    const text = await cell.innerText();
    return text.includes(expectedText);
  }

  /* ---------- TEST CASE 3 ---------- */
  async openLanguageDropdown() {
    await this.dropdown.waitFor({ state: "visible", timeout: 15000 });
    await this.dropdown.click();
  }

  async selectEnlmtOption(optionName) {
    const option = this.dropdownOption(optionName);
    await option.waitFor({ state: "visible", timeout: 15000 });
    await option.click();
    await this.waitForTableToLoad();
  }

  async getEnrollmentColumnName() {
    await this.enrollmentHeader.waitFor({ state: "visible", timeout: 15000 });
    return await this.enrollmentHeader.innerText();
  }

  async getEnrollmentColumnValues() {
    const cells = this.page.locator(this.enrollmentCells);
    const count = await cells.count();

    const values = [];
    for (let i = 0; i < count; i++) {
      values.push(await cells.nth(i).innerText());
    }
    return values;
  }

  async printEnrollmentData() {
    const columnName = await this.getEnrollmentColumnName();
    console.log(`\nColumn Name: ${columnName}`);

    const rows = await this.getEnrollmentColumnValues();
    rows.forEach((value, index) => {
      console.log(`Row ${index + 1}: ${value}`);
    });
  }
}

module.exports = TablePage;
