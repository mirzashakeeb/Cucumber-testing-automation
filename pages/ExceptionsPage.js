const BasePage = require("./BasePage");
const { urls } = require('../config/testData');

class ExceptionsPage extends BasePage {
  
  constructor(page) {
    super(page);

    this.addBtn = "#add_btn";
    this.instructions = "#instructions";

    //Row1
    this.editBtn = "#edit_btn";
    this.row1Input = "#row1 input";
    this.confirmMsg = "#confirmation";

    //Row 2
    this.row2Input = "#row2 input";
    this.saveBtn = "button[name='Save']";

  }

  async openPage() {
    await this.navigate(urls.EXCEPTIONS);
  }

  async clickAddButton() {
    await this.click(this.addBtn);
  }

  async waitForRow2() {
    await this.page.waitForSelector(this.row2Input, {
      timeout: 6000,
      state: "visible",
    });
  }

  async typeInRow2(text) {
    await this.waitForRow2();
    await this.page.fill(this.row2Input, text);
  }

  async clickVisibleSave() {
    const allSaveButtons = await this.page.$$(this.saveBtn);

    for (const btn of allSaveButtons) {
      if (await btn.isVisible()) {
        await btn.click();
        return;
      }
    }

    throw new Error("No visible Save button found");
  }

  async clickEditButton() {
    await this.click(this.editBtn);
  }

  async clearRow1Input() {
    await this.page.waitForSelector(this.row1Input, { timeout: 15000 });

    // Ensure input is now enabled
    await this.page.waitForFunction(
      (selector) => !document.querySelector(selector).disabled,
      this.row1Input
    );

    await this.page.fill(this.row1Input, "");
  }

  async typeRow1(text) {
    await this.page.fill(this.row1Input, text);
  }

  async clickSaveRow1() {
    await this.clickVisibleSave();
  }

  async getSavedMessageRow1() {
    await this.page.waitForSelector(this.confirmMsg);
    return await this.page.textContent(this.confirmMsg);
  }

  async getInstructionsElement() {
    return await this.page.$(this.instructions);
  }

  async instructionsShouldDisappear() {
    await this.page.waitForSelector(this.instructions, {
      state: "detached",
      timeout: 8000,
    });
  }
  async waitForRow2WithShortTimeout() {
  await this.page.waitForSelector("#row2 input", {
    timeout: 6000, // Only 3 seconds → this will fail intentionally
    state: "visible",
  });
}

}

module.exports = ExceptionsPage;
