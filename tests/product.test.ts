import "dotenv/config";
import { agent } from "supertest";
import { Product } from "../src/domains/product/entity";
// import { ProductService } from "../src/domains/product/service";
import { AppDataSource } from "../src/orm";
import { Status } from "../src/domains/product/enums/status";
import { ProductService } from "../src/domains/product/service";
import app from "../src/app";

beforeAll(async () => {
  AppDataSource.setOptions({
    database: "dm_test",
  });

  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Product Service", () => {
  const productService = new ProductService();
  const expected: Product = { name: "Test Product" } as Product;
  let created: Product;

  it("should create a product", async () => {
    created = await productService.createProduct(expected);
    expect(created.id).toBeGreaterThan(0);
    expect(created.name).toEqual(expected.name);
  });

  it("should get a product", async () => {
    const fetched = await productService.getProduct(expected.id);
    expect(fetched.name).toEqual(expected.name);
    expect(fetched.status).toEqual(Status.INVALID);
    expect(fetched.name).toBe(expected.name);
  });

  it("should update a product", async () => {
    const updatedFields: Product = { name: "Updated Product" } as Product;
    const fetched = await productService.getProduct(expected.id);
    const result = await productService.updateProduct(fetched.id, updatedFields);
    expect(result.name).not.toEqual(expected.name);
    expect(result.name).toEqual(updatedFields.name);
  });

  it("should list products", async () => {
    const list = await productService.getProducts();
    expect(list).toBeInstanceOf(Array);
    list.forEach((item) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("status");
    });
  });

  it("should create and delete a product", async () => {
    const deleteMe: Product = { name: "Delete me Product" } as Product;
    const result = await productService.createProduct(deleteMe);
    await productService.deleteProduct(result.id);
    await expect(productService.getProduct(deleteMe.id)).rejects.toThrow();
  });

  it("should delete the first product", async () => {
    await productService.deleteProduct(created.id);
    await expect(productService.getProduct(created.id)).rejects.toThrow();
  });
});

describe("Product e2e", () => {
  const expected: Product = { name: "Test Product" } as Product;
  let created: Product;
  it("should create a product", async () => {
    const res = await agent(app).post("/products").send(expected);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(expected.name);
    created = res.body as Product;
  });

  it("should get a product", async () => {
    const res = await agent(app).get(`/products/${created.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(expected.name);
  });

  it("should update a product", async () => {
    const updatedFields: Product = { name: "Updated Product" } as Product;
    const res = await agent(app).put(`/products/${created.id}`).send(updatedFields);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(updatedFields.name);
  });

  it("should list products", async () => {
    const res = await agent(app).get(`/products`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((item: Product) => {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("status");
    });
  });

  it("should delete a product", async () => {
    const res = await agent(app).delete(`/products/${created.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Product deleted successfully!");
  });
});
