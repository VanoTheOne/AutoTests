const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('ChromeDriver website tests', () => {
  let driver;
  before(async () => {
    driver = new Builder().forBrowser('chrome').build();
    await driver.get('https://chromedriver.chromium.org/home/');
    await driver.manage().window().setSize({ width: 1960, height: 1280 });
  });

  after(async () => {
    await driver.quit();
  });

  it(`Should check the page titles and highlight title 'Chrome Extensions'`, async () => {
    const chromeDriverTitle = await driver.findElement(By.css('span.Rn3Z1b.C9DxTc'));
    expect(await chromeDriverTitle.getText()).to.equal('ChromeDriver');
    const enterButton = await driver.findElement(By.xpath('//div[@class="PsKE7e qV4dIc Qrrb5 YSH9J"]//a[text()="Chrome Extensions"]/parent::*[@jsaction="click:vHQTA(QwLHlb); keydown:mPuKz(QwLHlb);"]'));
    await enterButton.click();
    const highLightTitle = await driver.findElement(By.css('span.Rn3Z1b'));
    await driver.executeScript("arguments[0].style.backgroundColor = 'yellow'", highLightTitle);
    const chromeExtensionsTitle = await driver.findElement(By.css('h1[id="h.p_ID_13"] span.Rn3Z1b'));
    expect(await chromeExtensionsTitle.getText()).to.equal('Chrome Extensions');
  });

  it(`Should check if the first link contains 'driver'`, async () => {
    const searchButton = await driver.findElement(By.css('div.RBEWZc'));
    await searchButton.click();
    const inputField = await driver.findElement(By.css('div.Xb9hP input'));
    await inputField.sendKeys('driver');
    const searchDriver = await driver.wait(until.elementLocated(By.css('div[jsname="lfEfFf"]')), 10000);
    await searchDriver.click();
    // await driver.actions().sendKeys(Key.ENTER).perform();
    // await driver.sleep(2000);
    const firstDriverlink = await driver.wait(until.elementLocated(By.xpath('//div[@class="vH0yjd" and a[contains(text(),"Getting started")]]//div[@class="yDWqEe"]//b[contains(text(),"driver")]')), 10000);
    expect(await firstDriverlink.getText()).to.contain('driver');
  });
});
