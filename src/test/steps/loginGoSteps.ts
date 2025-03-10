import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import LoginGoPage from "../../pages/loginGoPage";

import { fixture } from "../../hooks/pageFixture";

let loginGoPage: LoginGoPage;

setDefaultTimeout(60 * 1000 * 2)

Given('que estou na tela de login do CissGo', async function () {
  
  await fixture.page.goto(process.env.BASEURL2);
  // await loginGoPage.navigateToLoginPage()
});

When('preencho o campo Usuário com valor {string}', async function (username) {

  loginGoPage = new LoginGoPage(fixture.page);
  await loginGoPage.enterUserName(username);

});

When('preencho o campo Senha com valor {string}', async function (password) {

  await loginGoPage.enterPassword(password);
});

When('clico no botão Entrar', async function () {

  await loginGoPage.clickLoginButton();
});


Then('deve logar no sistema', async function () {

  await loginGoPage.checkSuccesLogin();
});

Then('não deve logar no sistema', async function () {

  await loginGoPage.checkFailedLogin();
});