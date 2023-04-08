import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/user.context";
import { IRegister } from "../../pages/register";
import Icons from "../../services/icons";
import {
  schemaConfirmPassword,
  schemaCreateContact,
} from "../../validation/contacts.schema";
import Button from "../button";
import { StyledForm } from "../form/style";
import Input from "../input";
import { StyleBackgroundModal, StyledButtonClose } from "./style";

interface IModalCreateContact {
  close: any;
}

const ModalConfirmPassword = ({ close }: IModalCreateContact) => {
  const { user, LoginRequest } = useUser();
  const {
    handleSubmit,
    register,
    formState: {
      errors: { password },
    },
  } = useForm<IRegister>({
    resolver: yupResolver(schemaConfirmPassword),
  });

  const handleContacts = async (data: any) => {
    data.email = user.email;
    const response = await LoginRequest(data);
    console.log(response);
  };
  return (
    <AnimatePresence>
      <StyleBackgroundModal>
        <StyledForm
          initial={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          onSubmit={handleSubmit(handleContacts)}
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
          <Button type="submit" color="gold" size="medium">
            Confirmar
          </Button>
        </StyledForm>
      </StyleBackgroundModal>
    </AnimatePresence>
  );
};

export default ModalConfirmPassword;
