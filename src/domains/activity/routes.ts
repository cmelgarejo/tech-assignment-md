import express from "express";
import controller from "./controller";

const router = express.Router();

router.post(`/activities`, controller.Create);
router.get(`/activities/:id`, controller.Read);
router.put(`/activities/:id`, controller.Update);
router.delete(`/activities/:id`, controller.Delete);
router.get(`/activities`, controller.List);

export default router;
