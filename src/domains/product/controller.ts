import { NextFunction, Request, Response } from "express";
import { ProductService } from "./service";
import { Product } from "./entity";
import validate from "./validation";

const productService = new ProductService();

const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = req.body;
    validate.schema.parse(product);
    const newProduct = await productService.createProduct(product);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
};

const Read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validate.id.parse(req.params.id);
    const product = await productService.getProduct(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validate.id.parse(req.params.id);
    const product: Product = validate.schema.parse(req.body) as Product;
    const updatedProduct = await productService.updateProduct(id, product);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validate.id.parse(req.params.id);
    await productService.deleteProduct(id);
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    next(error);
  }
};

const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await productService.getProducts());
  } catch (error) {
    next(error);
  }
};

export default { Create, Read, Update, Delete, List };
