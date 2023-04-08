import { useForm } from "react-hook-form";
import Input from "../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreateUser } from "../../validation/login.schema";
import { StyledForm } from "../../components/form/style";
import Button from "../../components/button";
import { useUser } from "../../context/user.context";
import { Link } from "react-router-dom";
import { StyledRegister } from "../login/style";

export interface IRegister {
  name: string;
  telefone: string;
  email: string;
  password: string;
  confirmPassword: string;
  confirmEmail: string;
}
const Register = () => {
  const { RegisterRequest } = useUser();
  const {
    handleSubmit,
    register,
    formState: {
      errors: {
        name,
        email,
        confirmEmail,
        password,
        confirmPassword,
        telefone,
      },
    },
  } = useForm<IRegister>({
    resolver: yupResolver(schemaCreateUser),
  });

  const onSubmitLogin = async (data: IRegister) => {
    await RegisterRequest(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitLogin)}>
      <h2>Cadastre-se</h2>
      <Input
        register={register}
        placeholder="Nome Completo"
        name="name"
        message={name ? `${name.message}` : undefined}
        maxwidth="100%"
      />
      <Input
        register={register}
        placeholder="Email"
        name="email"
        message={email ? `${email.message}` : undefined}
        maxwidth="100%"
      />
      <Input
        register={register}
        placeholder="Confirmar Email"
        name="confirmEmail"
        message={confirmEmail ? `${confirmEmail.message}` : undefined}
        maxwidth="100%"
      />
      <Input
        register={register}
        placeholder="Senha"
        name="password"
        iconposition="right"
        message={password ? `${password.message}` : undefined}
        maxwidth="100%"
        type="password"
      />
      <Input
        register={register}
        placeholder="Confirmar Senha"
        name="confirmPassword"
        iconposition="right"
        message={confirmPassword ? `${confirmPassword.message}` : undefined}
        maxwidth="100%"
        type="password"
      />
      <Input
        register={register}
        placeholder="Celular"
        name="telefone"
        message={telefone ? `${telefone.message}` : undefined}
        maxwidth="100%"
      />
      <Button type="submit" color="gold" size="medium">
        Criar conta
      </Button>

      <StyledRegister>
        <p>Já possui conta??</p>
        <Link to={"/login"}>ENTRAR</Link>
      </StyledRegister>
    </StyledForm>
  );
};

export default Register;
