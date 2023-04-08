import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email ou Apelido é obrigatorio"),
  password: yup
    .string()
    .max(20, "Pode ter um tamanho máximo de 20 caracteres")
    .required("Senha é obrigatorio"),
});

export const schemaCreateUser = yup.object().shape({
  name: yup.string().required("Deve conter um nome completo"),
  email: yup.string().email("Email inválido").required("Deve conter um email"),
  confirmEmail: yup
    .string()
    .email("Email inválido")
    .oneOf([yup.ref<string>("email")], "Email deve ser igual")
    .required("Deve conter um email"),
  password: yup
    .string()
    .min(8, "Deve conter no minimo 8 caracteres")
    .max(20, "Pode ter um tamanho máximo de 20 caracteres")
    .required("Deve conter um senha"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref<string>("password")], "Senha deve ser igual")
    .min(8, "Deve conter no minimo 8 caracteres")
    .max(20, "Pode ter um tamanho máximo de 20 caracteres")
    .required("Deve conter um senha"),
  telefone: yup
    .string()
    .required("Deve conter um numero de telefone ex: 'DDD 0 0000-0000' "),
});
