import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

async function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default class EmpresaPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
      empresaCel: (empresa: string) => `//div[contains(@class, 'x-list-inner-ct')]//div[contains(@class, 'x-gridrow')]//div[contains(@class, 'x-gridcell')]//div[contains(@class, 'x-body-el') and normalize-space(text())='${empresa}']`,
      empresaLogada: (empresaLogada: string) => `//div[contains(@class, 'x-container')]//div[contains(@class, 'x-body-el')]//div[contains(@class, 'x-text-el') and normalize-space(text())='${empresaLogada}']`
    }

    async clickEmpresaCel(empresa: string) {
      const selectEmpresa = this.page.locator(this.Elements.empresaCel(empresa));
      
      await selectEmpresa.click({ force: true });
    }

    async verifyEmpresaLogada(empresaLogada: string) {
      const empresaSelecionada = this.page.locator(this.Elements.empresaLogada(empresaLogada));
  
      const innerText = await empresaSelecionada.textContent();
  
      console.log(`🛠️ Texto encontrado: "${innerText}" | Texto esperado: "${empresaLogada}"`);
  
      if (innerText?.trim() === empresaLogada) {
          return true;
      } else {
          throw new Error(`❌ O texto da empresa logada não corresponde. Esperado: "${empresaLogada}", Obtido: "${innerText}"`);
      }
  }
  
}