import { schema } from './schema';

export function Validation(config: any) {
  const result = schema.safeParse(config);
  if (result.success) {
    return result.data;
  }
  const paths = result.error.issues.map((issue) => issue.path.join('.'));
  const message = `The Errors are from ${paths.join(',')}`;
  throw new Error(message);
}
