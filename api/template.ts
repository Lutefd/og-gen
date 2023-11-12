import { VercelRequest, VercelResponse } from '@vercel/node';
import { getHtml } from '../utils/template';
import { schema } from '../utils/validation';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    return res
      .status(400)
      .send('INVALID QUERY PLEASE CHECK HOW TO USE THE API AGAIN');
  }
  const { type, ...options } = result.data;

  const html = getHtml(options);

  res
    .status(200)
    .setHeader('Content-Type', 'text/hml')
    .setHeader(
      'Content-Type',
      'public, immutable, no-transform, s-maxage=3600, max-age:3600'
    )
    .end(html);
}
