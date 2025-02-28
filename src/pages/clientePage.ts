import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

async function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default class ClientePage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        menuButton: "div#ext-cissgo-menu-header-headermenu-2>div>div>button",

    }

    async navigateToLoginPage() {

        await this.base.goto("/#");
    }

    async clickMenuBtn() {
      await this.page.locator(`//div[contains(@class, 'x-component') and contains(@class, 'x-button')]//div[contains(@class, 'x-text-el') and text()='2003']`).waitFor({ state: 'visible' });

      await this.page.locator(`//div[contains(@class, 'x-component') and contains(@class, 'x-button')]//div[contains(@class, 'x-text-el') and text()='2003']`).click({force: true});

    }

    async clickBtn(btn: string) {

      await this.page.locator(`//div[normalize-space(text())='${btn}']`).click({force: true});
    }

    async fillField(campo: string, valor: string) {

      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).clear();
      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).fill(valor);
      await this.page.waitForTimeout(1000);

    }

    async fillFieldAndSelect(campo: string, valor: string) {

      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).clear();
      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).fill(valor);
    }

    async waitTest() {

      await this.page.waitForTimeout(10000);

    }

    async verifyError() {
      const errorMessages = await this.page.locator('//div[@class="x-error-message-el"]').all();

      let errorsList: string[] = [];
  
      for (const errorMessage of errorMessages) {
          const text = await errorMessage.textContent();
          if (text?.trim()) {
              errorsList.push(text.trim());
          }
      }
  
      if (errorsList.length > 0) {
          console.log('\n Erros encontrados:', errorsList);
      } else {
          console.log('Nenhum erro encontrado.');
      }
  
      // Verificar que pelo menos um erro foi detectado
      expect(errorsList.length).toBeGreaterThan(0);
    
    }
}