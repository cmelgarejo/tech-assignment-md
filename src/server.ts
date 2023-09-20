import { AppDataSource } from "./orm";
import app from "./app";

const port = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(async () => {
        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => console.log(error));
