import { z } from 'zod';
export type config = z.infer<typeof schema>;

export const schema = z.object({
  PORT: z.string().min(0, {
    message: 'PORT must be set',
  }),
});
