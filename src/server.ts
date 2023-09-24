import { AppDataSource } from "./orm";
import app from "./app";
import swaggerAutogen from "swagger-autogen";

const port = process.env.PORT || 3000;

//Swagger autogen
swaggerAutogen()("./swagger.json", ["./src/app.ts"]);

AppDataSource.initialize()
  .then(async () => {
    // Start the server
    app.listen(port, () => console.info(`Server is running on port ${port}`));
  })
  .catch((err) => console.error(err));
