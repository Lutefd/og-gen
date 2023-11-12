import { z } from 'zod';

export const schema = z.object({
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(128),
  type: z.enum(['png', 'jpeg', 'webp']).default('jpeg'),
  dark: z
    .enum(['true', 'false'])
    .default('true')
    .transform((val) => val === 'true'),
});
