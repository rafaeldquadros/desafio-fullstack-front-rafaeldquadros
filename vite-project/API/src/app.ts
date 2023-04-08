import "reflect-metadata";
import "express-async-errors";
import cors from "cors";

import express from "express";
import { clientsRouter } from "./routes/client.routes";
import handleError from "./errors/handleError";
import { sessionRouter } from "./routes/session.routes";
import contactsRoutes from "./routes/contacts.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/client", clientsRouter);
app.use("/contacts", contactsRoutes);
app.use("/session", sessionRouter);

app.use(handleError);

export default app;
