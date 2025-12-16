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
    console.log(" Navigating to Exceptions Page");
    await this.navigate(urls.EXCEPTIONS);
  }

  async clickAddButton() {
    console.log(" Clicking Add button");
    await this.click(this.addBtn);
  }

  async waitForRow2() {
    console.log(" Waiting for Row 2 input to become visible");
    await this.waitForVisible(this.row2Input, 15000);
    console.log(" Row 2 input is visible");
  }

  async typeInRow2(text) {
    console.log(` Typing in Row 2: "${text}"`);
    await this.waitForRow2();
    await this.type(this.row2Input, text);
  }

  async clickVisibleSave() {
    console.log(" Looking for a visible Save button");

    await this.page.waitForSelector(this.saveBtn, {
      state: "attached",
      timeout: 15000,
    });

    const buttons = await this.page.locator(this.saveBtn).all();

    for (const btn of buttons) {
      if (await btn.isVisible()) {
        console.log(" Clicking visible Save button");
        await btn.click();
        return;
      }
    }

    console.log(" No visible Save button found");
    throw new Error("No visible Save button found");
  }

  async clickEditButton() {
    console.log(" Clicking Edit button for Row 1");
    await this.click(this.editBtn);
  }

  async clearRow1Input() {
    console.log(" Clearing Row 1 input");

    await this.waitForVisible(this.row1Input, 15000);

    await this.page.waitForFunction(
      (selector) => !document.querySelector(selector).disabled,
      this.row1Input
    );

    await this.type(this.row1Input, "");
    console.log(" Row 1 input cleared");
  }

  async typeRow1(text) {
    console.log(` Typing in Row 1: "${text}"`);
    await this.waitForVisible(this.row1Input, 15000);
    await this.type(this.row1Input, text);
  }

  async clickSaveRow1() {
    console.log(" Saving Row 1");
    await this.clickVisibleSave();
  }

  async getSavedMessageRow1() {
    console.log(" Waiting for confirmation message");
    await this.waitForVisible(this.confirmMsg, 15000);

    const message = await this.getText(this.confirmMsg);
    console.log(` Confirmation message displayed: "${message}"`);

    return message;
  }

  async instructionsShouldDisappear() {
    console.log(" Waiting for instructions to disappear");
    await this.page.waitForSelector(this.instructions, {
      state: "detached",
      timeout: 15000,
    });
    console.log(" Instructions have disappeared");
  }

  // Timeout test (intentional)
  async waitForRow2WithShortTimeout() {
    console.log(" Waiting for Row 2 with short timeout (intentional failure test)");
    await this.page.waitForSelector(this.row2Input, {
      timeout: 3000,
      state: "visible",
    });
  }
}

module.exports = ExceptionsPage;
