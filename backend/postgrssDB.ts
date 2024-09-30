import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

function createPool(database: string) {
  return new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: database,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT as string, 10),
  });
}

export const pool_Restraunt = createPool(process.env.DB_RESTRAUNT as string);
export const pool_User = createPool(process.env.DB_USERS as string);
export const pool_Hotel = createPool(process.env.DB_HOTEL as string);
