import core, { ScreenshotOptions } from 'puppeteer-core';
import puppeteer from 'puppeteer-core';
import { getOptions } from './options';

let page: core.Page | null = null;

async function getPage(isDev: boolean): Promise<core.Page> {
  if (page) {
    return page;
  }

  const options = await getOptions(isDev);
  const browser = await puppeteer.launch(options);
  page = await browser.newPage();
  return page;
}

export async function getScreenshot(
  html: string,
  type: ScreenshotOptions['type'],
  isDev: boolean
) {
  const canvas = await getPage(isDev);
  await canvas.setViewport({ width: 2048, height: 1170 });
  await canvas.setContent(html);
  await canvas.waitForNetworkIdle();

  return await page?.screenshot({ type });
}

// export default async function getScreenshot(url: string) {
//   const options = process.env.AWS_REGION
//     ? {
//         args: chrome.args,
//         executablePath: await chrome.executablePath,
//         headless: chrome.headless,
//       }
//     : {
//         args: [],
//         executablePath:
//           process.platform === 'win32'
//             ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
//             : process.platform === 'linux'
//             ? '/usr/bin/google-chrome'
//             : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
//       };
//   const page = await browser.newPage();
//   await page.setViewport({ width: 2000, height: 1000 });
//   await page.goto(url, { waitUntil: 'networkidle0' });
//   return await page.screenshot({ type: 'png' });
// }
