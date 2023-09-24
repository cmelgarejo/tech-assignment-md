import "reflect-metadata";
import { z } from "zod";
import { Product } from "../src/product/entity";
import { Status } from "../src/product/enums/status";
import { ProductService } from "../src/product/service";

const productService = new ProductService();

const ProductSchema = z.object({
  name: z.string(),
  status: z.enum([Status.VALID, Status.INVALID]),
});

// service mock
// jest.mock("../src/product/service", () => {
//   return {
//     ProductService: jest.fn().mockImplementation(() => {
//       return {
//         createProduct: jest.fn().mockImplementation((product: Product) => {
//           return Promise.resolve(product);
//         }),
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         getProduct: jest.fn().mockImplementation((id: number) => {
//           return Promise.resolve(expected);
//         }),
//         updateProduct: jest.fn().mockImplementation((id: number, product: Product) => {
//           return Promise.resolve(product);
//         }),
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         deleteProduct: jest.fn().mockImplementation((id: number) => {
//           return Promise.resolve();
//         }),
//         getProducts: jest.fn().mockImplementation(() => {
//           return Promise.resolve([expected]);
//         }),
//       };
//     }),
//   };
// });

const expected: Product = { name: "Test Product", status: Status.INVALID } as Product;

describe("Product", () => {
  it("should create a product", async () => {
    const product = await productService.createProduct(expected);
    expect(ProductSchema.parse(product)).toHaveProperty("name");
    expect(product.name).toBe("Test Product");
  });

  it("should get a product", async () => {
    const fetchedProduct = await productService.getProduct(expected.id ?? 0);
    expect(ProductSchema.parse(fetchedProduct).name).toEqual(expected.name);
    expect(ProductSchema.parse(fetchedProduct).status).toEqual(expected.status);
    expect(fetchedProduct.name).toBe(expected.name);
  });

  // it("should not update a product", async () => {
  //   product.name = "Updated Product";
  //   await expect(productService.updateProduct(product.id ?? 0, product)).rejects.toThrow();
  // });

  // it("should delete a product", async () => {
  //   await productService.deleteProduct(product.id);
  //   await expect(productService.getProduct(product.id)).rejects.toThrow();
  // });

  // it("should list products", async () => {
  //   const products = await productService.getProducts();
  //   expect(products).toBeInstanceOf(Array);
  //   products.forEach((product) => {
  //     expect(ProductSchema.parse(product)).toHaveProperty("id");
  //   });
  // });
});
