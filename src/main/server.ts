import express from "express";

import { router } from "../routes";

const app = express();
app.use(express.json());

app.use(router);

if (process.env.NODE_ENV !== "test") {
    app.listen(3333, () => console.log("Server is running!"));
}

export { app };
