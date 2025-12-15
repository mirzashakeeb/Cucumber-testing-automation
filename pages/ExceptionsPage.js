const BasePage = require("./BasePage");
const { urls } = require("../config/testData");

class ExceptionsPage extends BasePage {
  constructor(page) {
    super(page);

    this.addBtn = "#add_btn";
    this.instructions = "#instructions";

    // Row 1
    this.editBtn = "#edit_btn";
    this.row1Input = "#row1 input";
    this.confirmMsg = "#confirmation";

    // Row 2
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
    await this.waitForVisible(this.row2Input, 15000);
  }

  async typeInRow2(text) {
    await this.waitForRow2();
    await this.type(this.row2Input, text);
  }

  async clickVisibleSave() {
    await this.page.waitForSelector(this.saveBtn, {
      state: "attached",
      timeout: 15000
    });

    const buttons = await this.page.locator(this.saveBtn).all();

    for (const btn of buttons) {
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
    await this.waitForVisible(this.row1Input, 15000);

    await this.page.waitForFunction(
      selector => !document.querySelector(selector).disabled,
      this.row1Input
    );

    await this.type(this.row1Input, "");
  }

  async typeRow1(text) {
    await this.waitForVisible(this.row1Input, 15000);
    await this.type(this.row1Input, text);
  }

  async clickSaveRow1() {
    await this.clickVisibleSave();
  }

  async getSavedMessageRow1() {
    await this.waitForVisible(this.confirmMsg, 15000);
    return await this.getText(this.confirmMsg);
  }

  async instructionsShouldDisappear() {
    await this.page.waitForSelector(this.instructions, {
      state: "detached",
      timeout: 15000
    });
  }

  // Timeout test (intentional)
  async waitForRow2WithShortTimeout() {
    await this.page.waitForSelector(this.row2Input, {
      timeout: 3000,
      state: "visible"
    });
  }
}

module.exports = ExceptionsPage;
