import "dotenv/config";
import { agent } from "supertest";
import { Activity, ActivityConnection } from "../src/domains/activity/entity";
import { ActivityService } from "../src/domains/activity/service";
import { AppDataSource } from "../src/orm";
import app from "../src/app";
import { ProductService } from "../src/domains/product/service";
import { Product } from "../src/domains/product/entity";
import { Status } from "../src/domains/product/enums/status";

let product: Product;

beforeAll(async () => {
  AppDataSource.setOptions({
    database: "dm_test",
  });

  await AppDataSource.initialize();

  // create a product for activity testing
  const productService = new ProductService();
  product = await productService.createProduct({ name: "Test Product for Activity testing" } as Product);
});

afterAll(async () => {
  await AppDataSource.destroy();
});

const activityService = new ActivityService();

describe("Activity Service", () => {
  let created: Activity;

  it("should create an activity", async () => {
    const expected: Activity = { name: "Test Activity", product: product } as Activity;
    created = await activityService.createActivity(expected);
    expect(created.id).toBeGreaterThan(0);
    expect(created.name).toEqual(expected.name);
  });

  it("should get an activity", async () => {
    const fetched = await activityService.getActivity(created.id);
    expect(fetched.name).toEqual(created.name);
  });

  it("should update an activity", async () => {
    const updatedFields: Activity = { name: "Updated Activity", product: product } as Activity;
    const fetched = await activityService.getActivity(created.id);
    const result = await activityService.updateActivity(fetched.id, updatedFields);
    expect(result.name).not.toEqual(created.name);
    expect(result.name).toEqual(updatedFields.name);
  });

  it("should list activities", async () => {
    const list = await activityService.getActivities();
    expect(list).toBeInstanceOf(Array);
    list.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("inputs");
      expect(item).toHaveProperty("outputs");
    });
  });

  it("should create and delete an activity", async () => {
    const deleteMe: Activity = { name: "Delete me Activity", product: product } as Activity;
    const result = await activityService.createActivity(deleteMe);
    await activityService.deleteActivity(result.id);
    await expect(activityService.getActivity(result.id)).rejects.toThrow();
  });

  it("should delete the first activity", async () => {
    await activityService.deleteActivity(created.id);
    await expect(activityService.getActivity(created.id)).rejects.toThrow();
  });
});

describe("Activity e2e", () => {
  let created: Activity;
  it("should create an activity", async () => {
    const expected: Activity = { name: "Test e2e Activity", product: product } as Activity;
    const res = await agent(app).post("/activities").send(expected);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(expected.name);
    created = res.body as Activity;
  });

  it("should get an activity", async () => {
    const res = await agent(app).get(`/activities/${created.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(created.name);
  });

  it("should update an activity", async () => {
    const updatedFields: Activity = { name: "Updated Activity" } as Activity;
    const res = await agent(app).put(`/activities/${created.id}`).send(updatedFields);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(updatedFields.name);
  });

  it("should list activities", async () => {
    const res = await agent(app).get("/activities");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((item: Activity) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("inputs");
      expect(item).toHaveProperty("outputs");
    });
  });

  // it should get the Test Product for Activity testing and check the status
  it("should get the Test Product for Activity testing and check the status", async () => {
    const res = await agent(app).get(`/products/${product.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(product.name);
    expect(res.body.status).toBe(Status.VALID);
  });

  // it should add a new activity and assign the created as its input
  it("should add a new activity and assign the created as its input", async () => {
    const expected: Activity = {
      name: "Test e2e Activity",
      product: product,
      inputs: [
        {
          fromActivity: created,
          value: 1,
        } as ActivityConnection,
      ],
    } as Activity;
    const res = await agent(app).post("/activities").send(expected);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(expected.name);
    expect(res.body.inputs).toBeInstanceOf(Array);
    expect(res.body.inputs.length).toBe(1);
    expect(res.body.inputs[0].fromActivity.id).toBe(created.id);
  });

  // it("should delete an activity", async () => {
  //   const res = await agent(app).delete(`/activities/${created.id}`);
  //   console.log(res.body);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toHaveProperty("message");
  //   expect(res.body.message).toBe("Activity deleted successfully!");
  // });
});
