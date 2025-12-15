const BasePage = require("./BasePage");
const { urls } = require('../config/testData'); 


class TablePage extends BasePage {
    constructor(page) {
        super(page);     
    this.page = page;

    // ---------- LANGUAGE COLUMN ----------
    this.languageColumnSelector = "td:nth-child(3)";
    this.languageDropdown = "#tablepress-1_filter > input";
    this.tableRows = "//tbody/tr[1]/td[3]";
    this.languageColumn = "//tbody/tr/td[3]";

    // ---------- LEVEL FILTERS ----------
    this.Beginner = this.page.locator("//input[@value='Beginner']");
    this.Intermediate = this.page.locator("//input[@value='Intermediate']");
    this.Advanced = this.page.locator("//input[@value='Advanced']");

    // ---------- TABLE LEVEL CELL (VISIBLE ROW) ----------
    this.levelCell = this.page.locator("//tbody/tr:not([style*='display:none'])/td[4]").first();

    // ---------- DROPDOWN ----------
    this.dropdown = this.page.locator("//div[@role='button']");  // "Any" dropdown
    this.Rupees = this.page.locator("//li[normalize-space()='10,000+']");

    // ---------- COLUMN HEADER ----------
    this.Enrollments = this.page.locator("//th[@id='col_enroll']");
   
    // ---------- LANGUAGE GROUP ----------
    this.languageGroup = this.page.locator("//fieldset[@role='group' and .//legend[text()='Language']]");

    // ---------- RESET FILTER BUTTON ----------
    this.resetFiltersBtn = this.page.locator("//button[normalize-space()='Reset filters']");

    // ---------- LEVEL FILTERS ----------
    this.Python = this.page.locator("//input[@type='radio' and @value='Python']");
    this.Intermediate = this.page.locator("//input[@type='checkbox' and @value='Intermediate']");
    this.Advanced = this.page.locator("//input[@type='checkbox' and @value='Advanced']");

    // ---------- LANGUAGE DROPDOWN ----------
    this.anyButton = this.page.locator("//button[normalize-space()='Any']");
    this.dropdownOption = (name) => this.page.locator(`//li[normalize-space()='${name}']`);

    // ---------- PLUS BUTTON (+) ----------
    this.plusButton = this.page.locator("//button[normalize-space()='+']");

    // ---------- TABLE CELL ----------
    this.tableCell = (name) => this.page.locator(`//td[normalize-space()='${name}']`);

}

    async openTablePage() {
        await this.navigate(urls.TABLE);
    }

    async selectLanguageFilter(language) {

        const radioLocator = this.page.getByLabel(language);
        await radioLocator.click();
        await this.page.waitForSelector(this.tableRows, { 
            state: 'attached', 
            timeout: 30000 
        });  
        
        await this.page.waitForTimeout(500);
    }
    
    async countCellsInColumnContaining(columnIndex, searchText) {
        const columnLocator = this.page.locator(`//tbody/tr/td[${columnIndex}]`);
        if (!searchText) {
        return await columnLocator.count();
        }
        const filtered = this.page.locator(`//tbody/tr/td[${columnIndex}]`, { hasText: searchText });
        return await filtered.count();
    }

    async getTotalCellsInColumn(columnIndex) {
        return await this.page.locator(`//tbody/tr/td[${columnIndex}]`).count();
    }

    
    async filterByLanguageInput(language) {
        await this.page.fill(this.languageDropdown, language);
        await this.page.keyboard.press("Enter");
        await this.page.waitForTimeout(500);
    }
    async getVisibleCourseLanguages() {
        const rows = await this.page.$$(this.tableRows);
        const langs = [];
        for (const row of rows) {
        const lang = await row.$eval(this.languageColumn, el => el.textContent.trim());
        langs.push(lang);
        }
        return langs;
    }

    async uncheckLevel(levelName) {
        await this.page.getByLabel(levelName).uncheck();
        await this.page.waitForTimeout(500); 
    }

    async checkAllLevels() {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    for (const level of levels) {
        await this.page.getByLabel(level).check();
    }
}
    async uncheckAllLevels() {
    const levels = ["Beginner", "Intermediate", "Advanced"];
    for (const level of levels) {
        await this.page.getByLabel(level).uncheck();
    }
}
    async verifyTextContains(expectedText) {
        const text = await this.page.locator('//tbody/tr[not(contains(@style,"display:none"))]/td[4]').first().innerText();
        return text.includes(expectedText);
    }

    async openLanguageDropdown() {
        await this.dropdown.click();
    }
    async selectEnlmtOption(optionName) {
        await this.Rupees.click()
    }
async getEnrollmentColumnName() {
    const header = this.page.getByRole('columnheader', { name: 'Enrollments' });
    return await header.innerText();
}

async getEnrollmentColumnValues() {
    const cells = this.page.locator('//tbody/tr/td[5]'); // Enrollments column = 5th column
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
    console.log(`Rows under "${columnName}":`);

    rows.forEach((value, index) => {
        console.log(`Row ${index + 1}: ${value}`);
    });
}

async selectPythonLanguage() {
    await this.pythonRadio.check();
}
}     

module.exports = TablePage;