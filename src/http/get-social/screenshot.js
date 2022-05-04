
const chromium = require('chrome-aws-lambda')
require('puppeteer-core')

function getBaseUrl() {
  let url
  if (process.env.NODE_ENV === 'testing') {
      url = 'http://localhost:3333'
  }
  else  {
      url = `https://${ process.env.NODE_ENV === 'staging' ? 'staging.' : '' }2022.cascadiajs.com`
  }
  return url
}

module.exports = async function screencap({ path }) {
    let browser
    let baseUrl = getBaseUrl()
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
      await page.goto(`${ baseUrl }${ path }?social`, { waitUntil: "networkidle0" })
      const file = await page.screenshot()
      await browser.close()
      return file
    } finally {
      if (browser) {
        await browser.close()
      }
    }
  }