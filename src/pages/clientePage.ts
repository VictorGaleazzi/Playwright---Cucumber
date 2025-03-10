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
          console.log('❌ Falha ao salvar! Erros encontrados:', errorsList);
          expect(errorsList.length).toBe(0); // Força a falha do teste
      } else {
          console.log('✅ Salvo com sucesso! Nenhum erro encontrado.');
          expect(errorsList.length).toBe(0); // Passa o teste normalmente
      }
    }

}