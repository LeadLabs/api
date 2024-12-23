import "dotenv/config";
import { Type as T } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const envSchema = T.Object({
  GITHUB_ACCESS_TOKEN: T.String(),
  GITHUB_ASSETS_SLUG: T.String(),
  DB_URI: T.String(),
});

export function decodeEnv() {
  const valueErrors = Value.Errors(envSchema, process.env);
  const errors = Array.from(valueErrors);

  if (errors.length) {
    throw new Error(JSON.stringify(errors));
  }

  return Value.Decode(envSchema, process.env);
}
