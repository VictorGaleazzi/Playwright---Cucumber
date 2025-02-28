import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import LoginGoPage from "../../pages/loginGoPage";

import { fixture } from "../../hooks/pageFixture";

let loginGoPage: LoginGoPage;

setDefaultTimeout(60 * 1000 * 2)

Given('que estou na tela de login do CissGo', async function () {
  
  await fixture.page.goto(process.env.BASEURL2);
});

Given('que preencho o campo usuário com valor {string}', async function (username) {

  loginGoPage = new LoginGoPage(fixture.page);
  await loginGoPage.enterUserName(username);
});

Given('que preencho o campo senha com valor {string}', async function (password) {

  await loginGoPage.enterPassword(password);
});

When('clico no botão entrar', async function () {
  
  await loginGoPage.clickLoginButton();
});

Then('deve logar no sistema', async function () {

  await loginGoPage.checkSuccesLogin();
});

Then('não deve logar no sistema', async function () {

  await loginGoPage.checkFailedLogin();
});