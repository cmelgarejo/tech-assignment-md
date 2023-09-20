import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "./entities/product"
import { Activity, ActivityConnection } from "./entities/activity"

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
})
