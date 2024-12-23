import { Type as T } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

export enum AssetType {
  NATIVE = "NATIVE",
  DENOMINATED = "DENOMINATED",
}

const transactionSchema = T.Object({
  coin: T.String(),
  sender: T.String(),
  recipient: T.String(),
  nonce: T.BigInt(),
  amount: T.BigInt(),
  hashOrId: T.String(),
  assetType: T.Optional(T.Enum(AssetType, { default: AssetType.NATIVE })),
  assetIdentifier: T.Optional(T.String()),
  walletId: T.String({ format: "uuid" }),
});

export function decodeTransaction(data: any) {
  const valueErrors = Value.Errors(transactionSchema, data);
  const errors = Array.from(valueErrors);

  if (errors.length) {
    throw new Error(JSON.stringify(errors));
  }

  return Value.Decode(transactionSchema, data);
}
