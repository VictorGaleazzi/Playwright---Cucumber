import { Given, When, setDefaultTimeout } from "@cucumber/cucumber";
import LoginGoPage from "../../pages/loginGoPage";
import ClientePage from "../../pages/clientePage";

import { fixture } from "../../hooks/pageFixture";

let loginGoPage: LoginGoPage;
let clientePage: ClientePage;

setDefaultTimeout(60 * 1000 * 2)

Given('que estou logado no CissGo com usuario {string} e senha {string}', async function (usuario, senha) {
  
  loginGoPage = new LoginGoPage(fixture.page);
  
  await fixture.page.goto(process.env.BASEURL2);
  await loginGoPage.loginUser(usuario, senha);

});

When('clico no botão de menu', async function () {

  clientePage = new ClientePage(fixture.page);

  await clientePage.clickMenuBtn();
});
 
When('clico no botão {string}', async function (btn) {

  await clientePage.clickBtn(btn);
});

When('preencho o campo {string} com valor {string}', async function (campo, valor) {

  await clientePage.fillField(campo, valor);
});

When('aguardo', async function () {

  await clientePage.verifyError();
});
