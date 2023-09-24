import { Product } from "./entity";
import { AppDataSource } from "../../orm";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);

  async createProduct(input: Product): Promise<Product> {
    return this.productRepository.save(input);
  }

  async getProduct(id: number): Promise<Product> {
    return this.productRepository.findOneByOrFail({ id });
  }

  async updateProduct(id: number, input: Product): Promise<Product> {
    await this.productRepository.update(id, input);
    return this.productRepository.findOneByOrFail({ id });
  }

  async deleteProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
