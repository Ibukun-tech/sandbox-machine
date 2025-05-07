import { z } from 'zod';
export type config = z.infer<typeof schema>;

export const schema = z.object({
  PORT: z.string().min(0, {
    message: 'PORT must be set',
  }),
  DOCKER_PATH: z.string().min(0, {
    message: 'default docker path must be set',
  }),
  REDIS_HOST: z.string().min(0, {
    message: 'the redis host must tbe specified',
  }),
  REDIS_PORT: z.string().min(0, {
    message: 'the redis port must be specified',
  }),
  DB_NAME: z.string().min(0, {
    message: 'The DB name must be specified',
  }),
  DB_HOST: z.string().min(0, {
    message: 'The DB_HOST must be specified',
  }),
  DB_PORT: z.string().min(0, {
    message: 'The DB_PORT must be specified',
  }),
  DB_USER: z.string().min(0, {
    message: 'The DB_USER must be specified',
  }),
  DB_PASSWORD: z.string().min(0, {
    message: 'The DB_PASSWORD must be specified',
  }),
});
