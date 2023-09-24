import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./domains/product/entity";
import { Activity, ActivityConnection } from "./domains/activity/entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "dm",
  password: "dm",
  database: "dm",
  synchronize: true,
  logging: false,
  entities: [Product, Activity, ActivityConnection],
  migrations: [],
  subscribers: [],
});
