import { Router } from "express";
import ClientController from "../controllers/client.controller";
import Middlewares from "../middlewares/auth.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataValid.middleware";
import {
  CreateClientSerializer,
  UpdateClientSerializer,
} from "../serializers/client.serializers";

export const clientsRouter = Router();

clientsRouter.post(
  "",
  ensureDataIsValidMiddleware(CreateClientSerializer),
  Middlewares.EnsureClientDontExists,
  ClientController.create
);

clientsRouter.get(
  "/perfil",
  Middlewares.Auth,
  Middlewares.EnsureUserExists,
  ClientController.listOne
);

clientsRouter.patch(
  "",
  Middlewares.UpdateData,
  ensureDataIsValidMiddleware(UpdateClientSerializer),
  Middlewares.Auth,
  Middlewares.EnsureUserExists,
  Middlewares.EnsureClientDontExists,
  ClientController.update
);

clientsRouter.delete(
  "",
  Middlewares.Auth,
  Middlewares.EnsureUserExists,
  ClientController.delete
);
