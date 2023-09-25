import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./orm";

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    // Start the server
    app.listen(port, () => console.info(`Server is running on port ${port}`));
  })
  .catch((err) => console.error(err));
