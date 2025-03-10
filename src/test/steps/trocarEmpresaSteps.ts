import { When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import EmpresaPage from "../../pages/empresaPage";

import { fixture } from "../../hooks/pageFixture";

let empresaPage: EmpresaPage;

setDefaultTimeout(60 * 1000 * 2)

When('seleciono a empresa {string}', async function (empresa) {
  empresaPage = new EmpresaPage(fixture.page);

  await empresaPage.clickEmpresaCel(empresa);
});

Then('verifico se a empresa {string} foi selecionada', async function (empresaSelecionada) {
  empresaPage = new EmpresaPage(fixture.page);

  await empresaPage.verifyEmpresaLogada(empresaSelecionada);
});