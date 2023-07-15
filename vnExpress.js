const puppeteer = require("puppeteer");
const KnownDevices = require("puppeteer");
const iPhone = KnownDevices.devices["iPhone 12 Pro"];

const scraperObject = {
  url: "https://google.com.vn",
  username: "nam.test.subiz@gmail.com",
  password: "#iloveyou3000",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto("https://vnexpress.net/", {
      waitUntil: "domcontentloaded",
    });
    console.log("load done");
    await Promise.all([
      page.emulate(iPhone),
      page.waitForNavigation({
        waitUntil: "domcontentloaded",
      }),
    ]);
    console.log("MOBILEEEEE");
    const wait = await Promise.all([
      page.waitForNavigation({
        waitUntil: "networkidle0",
      }),
      page.click("body > div > a > section > div.weather"),
    ]);
    console.log("Click doneee");

    await page.screenshot({
      path: "vxexpress.png",
      type: "png",
      fullPage: true,
    });

    console.log("SCREENNNNNN");
    await sleep(3000)

    browser.close();
  },
};

module.exports = scraperObject;
function sleep(ms) {
  return new Promise(function (res) {
    setTimeout(res, ms);
  });
}
