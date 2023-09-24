import express from "express";
import controller from "./controller";

const router = express.Router();

router.post(`/products`, controller.Create);
router.get(`/products/:id`, controller.Read);
router.put(`/products/:id`, controller.Update);
router.delete(`/products/:id`, controller.Delete);
router.get(`/products`, controller.List);

export default router;
