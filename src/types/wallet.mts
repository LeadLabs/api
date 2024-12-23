import { Type as T } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const walletSchema = T.Object({
  address: T.String(),
});

export function decodeWallet(data: any) {
  const valueErrors = Value.Errors(walletSchema, data);
  const errors = Array.from(valueErrors);

  if (errors.length) {
    throw new Error(JSON.stringify(errors));
  }

  return Value.Decode(walletSchema, data);
}
