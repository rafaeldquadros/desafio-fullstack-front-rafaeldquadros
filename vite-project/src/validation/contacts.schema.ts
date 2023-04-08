import * as yup from "yup";

export const schemaCreateContact = yup.object().shape({
  name: yup.string().required("Deve conter um nome completo"),
  email: yup.string().email("Email inválido").required("Deve conter um email"),
  telefone: yup
    .string()
    .required("Deve conter um numero de telefone ex: 'DDD 0 0000-0000' "),
});

export const schemaConfirmPassword = yup.object().shape({
  password: yup.string().required("Deve conter um senha"),
});
