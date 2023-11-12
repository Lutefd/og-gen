import core, { ScreenshotOptions } from 'puppeteer-core';
import { getOptions } from './options';

let page: core.Page | null = null;

async function getPage(isDev: boolean): Promise<core.Page> {
  if (page) {
    return page;
  }

  const options = await getOptions(isDev);
  const browser = await core.launch(options);
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
