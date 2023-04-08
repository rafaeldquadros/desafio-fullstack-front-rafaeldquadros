import { yupResolver } from "@hookform/resolvers/yup";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useUser } from "../../context/user.context";
import { IRegister } from "../../pages/register";
import Icons from "../../services/icons";
import { schemaCreateContact } from "../../validation/contacts.schema";
import Button from "../button";
import { StyledForm } from "../form/style";
import Input from "../input";
import { StyleBackgroundModal, StyledButtonClose } from "./style";

interface IModalCreateContact {
  close: any;
}

const ModalCreateContact = ({ close }: IModalCreateContact) => {
  const { CreateContactRequest } = useUser();
  const {
    handleSubmit,
    register,
    formState: {
      errors: { name, email, telefone },
    },
  } = useForm<IRegister>({
    resolver: yupResolver(schemaCreateContact),
  });

  const handleContacts = (data: any) => {
    CreateContactRequest(data);
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
          <h2>Criar contato</h2>
          <StyledButtonClose type="button" onClick={() => close(false)}>
            <Icons.Close />
          </StyledButtonClose>

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
            placeholder="Celular"
            name="telefone"
            message={telefone ? `${telefone.message}` : undefined}
            maxwidth="100%"
          />
          <Button type="submit" color="gold" size="medium">
            Criar conta
          </Button>
        </StyledForm>
      </StyleBackgroundModal>
    </AnimatePresence>
  );
};

export default ModalCreateContact;
