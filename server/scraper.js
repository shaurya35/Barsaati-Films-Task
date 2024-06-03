//old scraper code which scrapes in console only
// scraper.js

const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const moment = require("moment");
const uuid = require("uuid");
const fs = require("fs");

async function scrapeTrends() {
  const options = new chrome.Options();
  options.addArguments("--disable-blink-features=AutomationControlled");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(
      "https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJteCI6IjIifQ%3D%3D%22%7D"
    );

    await driver.manage().setTimeouts({ implicit: 10000 });
    await driver.manage().window().maximize();

    // Wait for the username field to be present
    const usernameField = await driver.wait(
      until.elementLocated(By.css('input[autocomplete="username"]')),
      20000
    );
    await usernameField.sendKeys("_00cypher");

    // Click the "Next" button
    const nextButton = await driver.wait(
      until.elementLocated(By.xpath('//span[text()="Next"]/ancestor::button')),
      20000
    );
    await nextButton.click();

    // Wait for the password field to be present
    const passwordField = await driver.wait(
      until.elementLocated(By.css('input[autocomplete="current-password"]')),
      20000
    );
    await passwordField.sendKeys("twitterplatinums108");

    // Click the "Log in" button
    const loginButton = await driver.wait(
      until.elementLocated(
        By.xpath('//span[text()="Log in"]/ancestor::button')
      ),
      20000
    );
    await loginButton.click();

    // Wait for the "What's happening" section to be present
    const whatsHappeningSection = await driver.wait(
      until.elementLocated(By.css('[aria-label="Timeline: Trending now"]')),
      20000
    );

    // Wait until the trends are loaded and visible
    await driver.wait(until.elementIsVisible(whatsHappeningSection), 20000);

    const trends = await driver.findElements(
      By.css('[aria-label="Timeline: Trending now"] span')
    );
    const topTrends = [];

    for (let i = 0; i < trends.length; i++) {
      const trend = await trends[i].getText();
      topTrends.push(trend);
    }

    const uniqueId = uuid.v4();
    const endTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const result = {
      uniqueId,
      trends: topTrends,
      endTime,
    };

    console.log(result);
    return result;
  } catch (err) {
    console.error("An error occurred:", err);
    const pageSource = await driver.getPageSource();
    fs.writeFileSync("error-page.html", pageSource);
  } finally {
    await driver.quit();
  }
}

scrapeTrends().catch(console.error);
