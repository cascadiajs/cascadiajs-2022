
const chromium = require('chrome-aws-lambda')
require('puppeteer-core')

module.exports = async function screencap({ url }) {
    let browser
    // set-up headless browser
    let height = 628
    let width = 1200
    let deviceScaleFactor = 1
    try {
      browser = await chromium.puppeteer.launch({
        args: chromium.args,
        defaultViewport: {
          height, width, deviceScaleFactor
        },
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
      })
      let page = await browser.newPage()
      await page.goto(url, { waitUntil: "networkidle2" })
      const file = await page.screenshot()
      await browser.close()
      return file
    } finally {
      if (browser) {
        await browser.close()
      }
    }
  }