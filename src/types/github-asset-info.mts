import { Type as T } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";

const assetInfoSchema = T.Object({
  id: T.String(),
  name: T.String(),
  website: T.String(),
  description: T.String(),
  explorer: T.String(),
  research: T.Optional(T.String()),
  symbol: T.String(),
  rpc_url: T.Optional(T.String()),
  type: T.String(),
  decimals: T.Union([T.String(), T.Integer()]),
  tags: T.Optional(T.Array(T.String())),
  links: T.Optional(T.Array(T.Object({ name: T.String(), url: T.String() }))),
  status: T.Optional(T.String()),
});

export function decodeGHAssetInfo(data: any) {
  const valueErrors = Value.Errors(assetInfoSchema, data);
  const errors = Array.from(valueErrors);

  if (errors.length) {
    throw new Error(JSON.stringify(errors));
  }

  return Value.Decode(assetInfoSchema, data);
}
