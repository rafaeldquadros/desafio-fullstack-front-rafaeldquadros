import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/user.context";
import { IRegister } from "../../pages/register";
import Icons from "../../services/icons";
import { schemaUpdatePassword } from "../../validation/contacts.schema";
import Button from "../button";
import { StyledForm } from "../form/style";
import Input from "../input";
import { StyleBackgroundModal, StyledButtonClose } from "./style";

interface IModalCreateContact {
  close: any;
}

const ModalUpdatePassword = ({ close }: IModalCreateContact) => {
  const { EditeClientRequest } = useUser();
  const {
    handleSubmit,
    register,
    formState: {
      errors: { password, confirmPassword },
    },
  } = useForm<IRegister>({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const handlePassword = async (data: any) => {
    delete data.confirmPassword;
    console.log(data);
    EditeClientRequest(data, "password");
  };
  return (
    <AnimatePresence>
      <StyleBackgroundModal>
        <StyledForm
          initial={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          onSubmit={handleSubmit(handlePassword)}
        >
          <h2>Digite a senha atual</h2>
          <StyledButtonClose type="button" onClick={() => close(false)}>
            <Icons.Close />
          </StyledButtonClose>

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
          <Button type="submit" color="gold" size="medium">
            Confirmar
          </Button>
        </StyledForm>
      </StyleBackgroundModal>
    </AnimatePresence>
  );
};

export default ModalUpdatePassword;
