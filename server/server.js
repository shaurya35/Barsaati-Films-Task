// 

const express = require("express");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const moment = require("moment");
const uuid = require("uuid");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

async function scrapeTrends(username, password) {
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

    const usernameField = await driver.wait(
      until.elementLocated(By.css('input[autocomplete="username"]')),
      20000
    );
    await usernameField.sendKeys(username);

    const nextButton = await driver.wait(
      until.elementLocated(By.xpath('//span[text()="Next"]/ancestor::button')),
      20000
    );
    await nextButton.click();

    const passwordField = await driver.wait(
      until.elementLocated(By.css('input[autocomplete="current-password"]')),
      20000
    );
    await passwordField.sendKeys(password);

    const loginButton = await driver.wait(
      until.elementLocated(
        By.xpath('//span[text()="Log in"]/ancestor::button')
      ),
      20000
    );
    await loginButton.click();

    const whatsHappeningSection = await driver.wait(
      until.elementLocated(By.css('[aria-label="Timeline: Trending now"]')),
      20000
    );

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
    require("fs").writeFileSync("error-page.html", pageSource);
    throw err;
  } finally {
    await driver.quit();
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/data", async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await scrapeTrends(username, password);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to scrape trends" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
