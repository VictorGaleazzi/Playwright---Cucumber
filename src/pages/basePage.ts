import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

async function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default class BasePageLocator {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
      menuButtonLocator: "//div[contains(@class, 'x-component') and contains(@class, 'x-button')]" +
        "//div[contains(@class, 'x-text-el') and not(contains(text(), ' '))]",
      buttonLocator: (btn: string) => `//div[normalize-space(text())='${btn}']`,
      inputSelectIten: (valor: string) => `//div[contains(normalize-space(text()), " ${valor}")]`,
      errorMessage: '//div[@class="x-error-message-el"]'
  };

    async navigateToLoginPage() {

      await this.base.goto("/#");
    }

    async clickMenuBtn() {
      const menuButton = this.page.locator(this.Elements.menuButtonLocator)
        .filter({ hasText: /^\d+$/ }); // Filtra números puros
    
      await menuButton.first().waitFor({ state: 'visible' }); // Aguarda o primeiro elemento visível
      await menuButton.first().click({ force: true }); // Clica no primeiro encontrado
    }

    async clickBtn(btn: string) {
      const button = this.page.locator(this.Elements.buttonLocator(btn));
      
      await button.click({ force: true });
    }

    async fillField(campo: string, valor: string) {

      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).clear();
      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).fill(valor);
      await this.page.waitForTimeout(1000);

    }

    async fillFieldAndSelect(campo: string, valor: string) {

      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).clear();
      await this.page.getByRole('textbox', { name: new RegExp(`^${campo}\\*?$`, 'i') }).fill(valor);
      await this.page.locator(this.Elements.inputSelectIten(valor)).click();
    }

    async verifyError() {
      const errorMessages = await this.page.locator(this.Elements.errorMessage).all();

      let errorsList: string[] = [];
  
      for (const errorMessage of errorMessages) {
          const text = await errorMessage.textContent();
          if (text?.trim()) {
              errorsList.push(text.trim());
          }
      }
  
      if (errorsList.length > 0) {
          console.log('❌ Falha ao salvar! Erros encontrados:', errorsList);
          expect(errorsList.length).toBe(0); // Força a falha do teste
      } else {
          console.log('✅ Salvo com sucesso! Nenhum erro encontrado.');
          expect(errorsList.length).toBe(0); // Passa o teste normalmente
      }

      await this.page.pause();
    }

}