import { AppDataSource } from "../src/orm";

beforeAll(async () => {
  AppDataSource.setOptions({
    database: "dm_test",
    synchronize: true,
  });
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});
