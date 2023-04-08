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

export const schemaUpdatePassword = yup.object().shape({
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
});
