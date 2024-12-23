import { DataSource } from "typeorm";
import { decodeEnv } from "../types/env.mjs";

const { DB_URI } = decodeEnv();
// App datasource
export const AppDataSource = new DataSource({
  type: "postgres",
  url: DB_URI,
});
