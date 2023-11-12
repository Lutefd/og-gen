import { VercelRequest, VercelResponse } from '@vercel/node';
import { getHtml } from '../utils/template';
import { getScreenshot } from '../utils/puppeteer';
import { schema } from '../utils/validation';

const isDev = !process.env.AWS_REGION;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    return res
      .status(400)
      .send('INVALID QUERY PLEASE CHECK HOW TO USE THE API AGAIN');
  }

  const { type, ...options } = result.data;
  const html = getHtml(options);
  const file = (await getScreenshot(html, type, isDev)) as string;

  res
    .status(200)
    .setHeader('Content-Type', `image/${type}`)
    .setHeader(
      'Cache-Control',
      'public, no-transform , immutable, s-maxage=3600, max-age=3600'
    )
    .end(file);
}
