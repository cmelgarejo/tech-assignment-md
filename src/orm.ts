import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./domains/product/entity";
import { Activity, ActivityConnection } from "./domains/activity/entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Product, Activity, ActivityConnection],
  migrations: [],
  subscribers: [],
});
