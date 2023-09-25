import express, { Application } from "express";
import productRoutes from "./domains/product/routes";
import activityRoutes from "./domains/activity/routes";
import { errHandler } from "./api/middleware";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app: Application = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/", activityRoutes);
app.use(errHandler);
app.use("/", productRoutes);

export default app;
