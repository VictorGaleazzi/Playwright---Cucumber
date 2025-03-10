import { Given, When, setDefaultTimeout } from "@cucumber/cucumber";
import LoginGoPage from "../../pages/loginGoPage";
import BasePageLocator from "../../pages/basePage";

import { fixture } from "../../hooks/pageFixture";
import * as data from "../../helper/util/test-data/registerUser.json";

let loginGoPage: LoginGoPage;
let basePage: BasePageLocator;

setDefaultTimeout(60 * 1000 * 2)

Given('que estou logado no CissGo', async function () {
  
  loginGoPage = new LoginGoPage(fixture.page);
  basePage = new BasePageLocator(fixture.page);

  
  await fixture.page.goto(process.env.BASEURL2);
  await loginGoPage.loginUser(data.userName, data.password);
});

When('clico no botão de menu', async function () {

  basePage = new BasePageLocator(fixture.page);

  await basePage.clickMenuBtn();
});
 
When('clico no botão {string}', async function (btn) {

  await basePage.clickBtn(btn);
});

When('preencho o campo {string} com valor {string}', async function (campo, valor) {
  console.log("🛠️ Verificando basePage:", basePage);
    
  if (!basePage) {
      throw new Error("❌ basePage não foi inicializado corretamente!");
  }

  await basePage.fillField(campo, valor);
});

When('preencho e seleciono o campo {string} com valor {string}', async function (campo, valor) {

  await basePage.fillFieldAndSelect(campo, valor);
});
