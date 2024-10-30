const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('UI Testing using Selenium', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should load the login page', async function () {
        await driver.get('D:/ppmpl/login.html');
        const title = await driver.getTitle();
        expect(title).to.equal('Login Page');
    });

    it('should input username and password using CSS Selector', async function () {
        await driver.findElement(By.css('#username')).sendKeys('testuser');
        await driver.findElement(By.css('#password')).sendKeys('password123');

        const usernameValue = await driver.findElement(By.css('#username')).getAttribute("value");
        const passwordValue = await driver.findElement(By.css('#password')).getAttribute('value');

        expect(usernameValue).to.equal('testuser');
        expect(passwordValue).to.equal('password123');
    });

    it('should click the login button', async function () {
        await driver.findElement(By.id('loginButton')).click();
    });

    it('should validate visual elements', async function () {
        const isButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();
        expect(isButtonDisplayed).to.be.true;

        const isUsernameFieldDisplayed = await driver.findElement(By.css('#username')).isDisplayed();
        expect(isUsernameFieldDisplayed).to.be.true;

        const isPasswordFieldDisplayed = await driver.findElement(By.xpath('//*[@id="password"]')).isDisplayed();
        expect(isPasswordFieldDisplayed).to.be.true;
    });
});
