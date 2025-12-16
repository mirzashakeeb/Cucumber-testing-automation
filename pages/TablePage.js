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
    console.log(" Navigating to Table Page");
    await this.navigate(urls.TABLE);
    await this.waitForTableToLoad();
  }

  async waitForTableToLoad() {
    console.log(" Waiting for table to load");
    await this.page.waitForSelector(this.table, {
      state: "visible",
      timeout: 15000,
    });
    console.log(" Table loaded successfully");
  }

  /* ---------- TEST CASE 1 ---------- */
  async selectLanguageFilter(language) {
    console.log(` Selecting Language filter: ${language}`);
    await this.languageRadio(language).check();
    await this.waitForTableToLoad();
  }

  async countCellsInColumnContaining(columnIndex, searchText) {
    console.log(
      ` Counting cells in column ${columnIndex} containing text: ${searchText}`
    );
    const locator = this.page.locator(
      `//tbody/tr/td[${columnIndex}]`,
      searchText ? { hasText: searchText } : {}
    );
    const count = await locator.count();
    console.log(` Found ${count} matching cells`);
    return count;
  }

  /* ---------- TEST CASE 2 ---------- */
  async uncheckLevel(levelName) {
    console.log(` Unchecking level: ${levelName}`);
    await this.levelCheckbox(levelName).uncheck();
    await this.waitForTableToLoad();
  }

  async verifyTextContains(expectedText) {
    console.log(` Verifying text contains: ${expectedText}`);
    const cell = this.page.locator(
      "//tbody/tr[not(contains(@style,'display:none'))]/td[4]"
    ).first();

    await cell.waitFor({ state: "visible", timeout: 15000 });
    const text = await cell.innerText();
    const result = text.includes(expectedText);

    console.log(` Text found: "${text}" | Match: ${result}`);
    return result;
  }

  /* ---------- TEST CASE 3 ---------- */
  async openLanguageDropdown() {
    console.log(" Opening Language dropdown");
    await this.dropdown.waitFor({ state: "visible", timeout: 15000 });
    await this.dropdown.click();
  }

  async selectEnlmtOption(optionName) {
    console.log(` Selecting enrollment option: ${optionName}`);
    const option = this.dropdownOption(optionName);
    await option.waitFor({ state: "visible", timeout: 15000 });
    await option.click();
    await this.waitForTableToLoad();
  }

  async getEnrollmentColumnName() {
    console.log(" Fetching Enrollment column name");
    await this.enrollmentHeader.waitFor({ state: "visible", timeout: 15000 });
    const name = await this.enrollmentHeader.innerText();
    console.log(` Column name: ${name}`);
    return name;
  }

  async getEnrollmentColumnValues() {
    console.log(" Fetching Enrollment column values");
    const cells = this.page.locator(this.enrollmentCells);
    const count = await cells.count();

    const values = [];
    for (let i = 0; i < count; i++) {
      const value = await cells.nth(i).innerText();
      values.push(value);
    }

    console.log(` Retrieved ${values.length} enrollment values`);
    return values;
  }

  async printEnrollmentData() {
    console.log(" Printing Enrollment Data");
    const columnName = await this.getEnrollmentColumnName();
    console.log(`\n Column Name: ${columnName}`);

    const rows = await this.getEnrollmentColumnValues();
    rows.forEach((value, index) => {
      console.log(`Row ${index + 1}: ${value}`);
    });
  }

  /* ---------- SORT BY COURSE NAME ---------- */

  async selectSortByCourseName() {
    console.log(" Sorting table by Course Name");
    const sortDropdown = this.page.getByLabel("Sort by:");
    await sortDropdown.selectOption("col_course");
    await this.waitForTableToLoad();
  }

  async getAllCourseNames() {
    console.log(" Fetching all course names");
    const courseCells = this.page.locator("//tbody/tr/td[2]");
    const count = await courseCells.count();

    const courseNames = [];
    for (let i = 0; i < count; i++) {
      courseNames.push((await courseCells.nth(i).innerText()).trim());
    }

    console.log(` Found ${courseNames.length} courses`);
    return courseNames;
  }

  async printSortedCourseNames() {
    console.log(" Printing sorted course names (A → Z)");
    const courseNames = await this.getAllCourseNames();

    console.log("\n Course Names (Sorted A → Z):");
    courseNames.forEach((name, index) => {
      console.log(`${index + 1}. ${name}`);
    });
  }
}

module.exports = TablePage;
