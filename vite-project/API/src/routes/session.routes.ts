import { Router } from "express";
import SessionControllers from "../controllers/session.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataValid.middleware";
import { LoginUserSerializer } from "../serializers/client.serializers";

export const sessionRouter = Router();

sessionRouter.post(
  "",
  ensureDataIsValidMiddleware(LoginUserSerializer),
  SessionControllers.login
);
