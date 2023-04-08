import * as yup from "yup";

export const CreateUserSerializerWithoutPass: any = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  telefone: yup.string().notRequired(),
  contacts: yup.array().notRequired(),
  createdAt: yup.string().notRequired(),
  updatedAt: yup.string().notRequired(),
});

export const CreateClientSerializer: any = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
  telefone: yup.string().required().max(11).min(11),
});

export const LoginUserSerializer: any = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const UpdateClientSerializer: any = yup.object().shape({
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  telefone: yup.string().notRequired().max(11).min(11),
});
