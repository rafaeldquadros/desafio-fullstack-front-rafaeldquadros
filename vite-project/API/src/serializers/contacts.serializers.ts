import * as yup from "yup";
import { CreateUserSerializerWithoutPass } from "./client.serializers";

export const CreateContactsSerializerWithoutPassword: any = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  telefone: yup.string().notRequired(),
  user: CreateUserSerializerWithoutPass,
  createdAt: yup.string().notRequired(),
  updatedAt: yup.string().notRequired(),
});

export const CreateContactsSerializer: any = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  telefone: yup.string().required().max(11).min(11),
});

export const UpdateContactSerializer: any = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  telefone: yup.string().notRequired().max(11).min(11),
});
