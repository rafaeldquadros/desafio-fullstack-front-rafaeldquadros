import { Router } from "express";
import ContactsController from "../controllers/contacts.controllers";
import Middlewares from "../middlewares/auth.middlewares";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataValid.middleware";
import {
  CreateContactsSerializer,
  UpdateContactSerializer,
} from "../serializers/contacts.serializers";

const contactsRoutes = Router();

contactsRoutes.post(
  "",
  Middlewares.Auth,
  ensureDataIsValidMiddleware(CreateContactsSerializer),
  Middlewares.EnsureUserExists,
  Middlewares.EnsureContactDontExists,
  ContactsController.create
);

contactsRoutes.get(
  "",
  Middlewares.Auth,
  Middlewares.EnsureUserExists,
  ContactsController.listAll
);

contactsRoutes.get(
  "/:id",
  Middlewares.Auth,
  Middlewares.EnsureUserExists,
  ContactsController.listOne
);

contactsRoutes.patch(
  "/:id",
  Middlewares.UpdateData,
  ensureDataIsValidMiddleware(UpdateContactSerializer),
  Middlewares.Auth,
  Middlewares.EnsureUserExists,
  ContactsController.update
);

contactsRoutes.delete(
  "/:id",
  Middlewares.Auth,
  Middlewares.EnsureUserExists,
  ContactsController.delete
);

export default contactsRoutes;
