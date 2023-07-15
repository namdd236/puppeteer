const puppeteer = require("puppeteer");
const KnownDevices = require("puppeteer");
const iPhone = KnownDevices.devices["iPhone 12 Pro"];

const scraperObject = {
  url: "https://google.com.vn",
  username: "nam.test.subiz@gmail.com",
  password: "#iloveyou3000",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(
      "https://accounts.google.com/v3/signin/identifier?dsh=S386857383%3A1688980965963231&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
      {
        waitUntil: "domcontentloaded",
      }
    );
    await page.type("input[type='email']", this.username);
    await Promise.all([
      page.keyboard.press("Enter"),
      page.waitForNavigation({
        waitUntil: "networkidle0",
      }),
    ]);

    // await page.waitForSelector("input[type='password']");
    await page.type("input[type='password']", this.password);
    await Promise.all([
      page.keyboard.press("Enter"),
      page.waitForNavigation({
        waitUntil: "domcontentloaded",
      }),
    ]);

    await page.goto(
      "https://mail.google.com/mail/u/0/h/1fdlpqz3vkk1z/?zy=e&view&f=1&f=1",
      {
        waitUntil: "domcontentloaded",
      }
    );

    await Promise.all([
      page.evaluate(() => {
        const trArr = Array.from(
          document.querySelectorAll("table tbody tr td a span")
        );

        let fetchValueRowIndex = trArr.filter((v, i) => {
          return v.innerHTML.includes("X1114");
        });

        fetchValueRowIndex[0].click();
      }),
      page.waitForNavigation({
        waitUntil: "networkidle0",
      }),
    ]);

    await Promise.all([
      page.evaluate(() => {
        const show = Array.from(
          document.querySelectorAll(
            "tbody > tr > td > table > tbody > tr > td > div > div > font > a"
          )
        );
        let btn_show = show.filter((v) => {
          return v.innerHTML.includes("Show quoted text");
        });

        if (btn_show[0]) btn_show[0].click();
      }),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 0.9,
    });

    await page.evaluate(() => {
      let body = document.querySelector('div[style*="max-width:600px"]');
      body.scrollIntoView();
    });

    let out_desk = "email_template_desktop.png";
    let out_mobile = "email_template_mobile.png";
    await page.screenshot({
      path: out_desk,
      type: "png",
      clip: {
        x: 160,
        y: 310,
        width: 610,
        height: 1180,
      },
    });
    await page.goto(
      "https://mail.google.com/mail/mu/mp/339/#tl/priority/%5Esmartlabel_personal",
      {
        waitUntil: "networkidle2",
      }
    );
    await page.setViewport({ width: 320, height: 480 });

    console.log("MONIDE");
    // await page.evaluate(() => {
    //   let trArr = Array.from(
    //     document.querySelectorAll("body > div > div > div > div > button")
    //   );
    //   let fetchValueRowIndex = trArr.filter((v, i) => {
    //     return v.innerHTML.includes("I am not interested");
    //   });
    //   console.log("Click done care");
    //   fetchValueRowIndex[0].click();
    // });
    await sleep(100);

    console.log("DONE CARE DOWENWWWW");

    await Promise.all([
      page.evaluate(() => {
        let trArr = Array.from(
          document.querySelectorAll(
            "body > div > div > div > div > div > div > div[role='button']"
          )
        );
        let fetchValueRowIndex = trArr.filter((v) => {
          let parent = v.parentNode;
          return parent.innerHTML.includes("X1114");
        });
        fetchValueRowIndex[0].click();
      }),
    ]);

    try {
      await page.waitForNavigation({
        waitUntil: "networkidle0",
        timeout: 3000,
      });
    } catch (e) {
      console.log("e");
    }
    console.log("Click donw");

    await Promise.all([
      page.waitForSelector('div[style="overflow: visible;"]', {}),
      page.click('div[aria-label="Show quoted text"]'),
    ]);
    console.log("startttttttttttttttt", new Date());

    await page.screenshot({
      path: out_mobile,
      type: "png",

      fullPage: true,
    });
    console.log("CAPTURE DONE");
    browser.close();
  },
};

module.exports = scraperObject;
function sleep(ms) {
  return new Promise(function (res) {
    setTimeout(res, ms);
  });
}
