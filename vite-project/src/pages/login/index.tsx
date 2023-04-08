import { useForm } from "react-hook-form";
import Input from "../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "../../validation/login.schema";
import { StyledForm } from "../../components/form/style";
import Button from "../../components/button";
import { useUser } from "../../context/user.context";
import { StyledRegister } from "./style";
import { Link } from "react-router-dom";

export interface ILogin {
  email: string;
  password: string;
}
const Login = () => {
  const { LoginRequest } = useUser();
  const {
    handleSubmit,
    register,
    formState: {
      errors: { email, password },
    },
  } = useForm<ILogin>({
    resolver: yupResolver(schemaLogin),
  });

  const onSubmitLogin = async (data: ILogin) => {
    const response = await LoginRequest(data);
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmitLogin)}>
      <h2>Login</h2>
      <Input
        placeholder="E-mail"
        name="email"
        message={email ? (email?.message as string) : undefined}
        type="text"
        register={register}
        maxwidth="100%"
      />
      <Input
        placeholder="Senha"
        name="password"
        message={password ? (password?.message as string) : undefined}
        type="password"
        register={register}
        maxwidth="100%"
      />
      <Button type="submit" color="gold" size="medium">
        Iniciar
      </Button>

      <StyledRegister>
        <p>Novo na plataforma?</p>
        <Link to={"/register"}>CADASTRE-SE</Link>
      </StyledRegister>
    </StyledForm>
  );
};

export default Login;
