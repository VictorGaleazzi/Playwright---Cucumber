import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export default class LoginGoPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        userInput: "Usuário",
        passwordInput: "Senha",
        loginBtn: "//div[normalize-space(text())='Entrar']",
        errorMessage: "alert",
        menuText: "Produtos",
        failedLogin: "Falha no Login."
    }

    async navigateToLoginPage() {
        await this.base.goto("/#");
    }

    async enterUserName(user: string) {
        
        await this.page.getByPlaceholder(this.Elements.userInput).fill(user);
    }
    async enterPassword(Password: string) {
        await this.page.getByPlaceholder(this.Elements.passwordInput).fill(Password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.loginBtn);
    }

    async checkSuccesLogin() {

        await expect(this.page.getByText(this.Elements.menuText)).toBeVisible();
    }

    async checkFailedLogin() {

        await expect(this.page.locator("(//div[@class='x-error-icon-el x-font-icon']/following-sibling::div)[3]")).toHaveText(this.Elements.failedLogin);

    }

    getErrorMessage() {
        return this.page.getByRole("alert");
    }

    async loginUser(user: string, password: string) {
        
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}