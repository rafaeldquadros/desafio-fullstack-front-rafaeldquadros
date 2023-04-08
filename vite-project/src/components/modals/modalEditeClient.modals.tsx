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

const ModalEditeClient = ({ close }: IModalCreateContact) => {
  const { EditeClientRequest, user } = useUser();
  const {
    handleSubmit,
    register,
    formState: {
      errors: { name, email, telefone },
    },
  } = useForm<IRegister>({
    resolver: yupResolver(schemaCreateContact),
  });

  const handleClient = (data: any) => {
    console.log(data);
    EditeClientRequest(data);
    // EditeContactRequest(data);
  };
  return (
    <AnimatePresence>
      <StyleBackgroundModal>
        <StyledForm
          initial={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          onSubmit={handleSubmit(handleClient)}
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
            defaultvalue={user.name}
          />
          <Input
            register={register}
            placeholder="Email"
            name="email"
            message={email ? `${email.message}` : undefined}
            maxwidth="100%"
            defaultvalue={user.email}
          />
          <Input
            register={register}
            placeholder="Celular"
            name="telefone"
            message={telefone ? `${telefone.message}` : undefined}
            maxwidth="100%"
            defaultvalue={user.telefone}
          />
          <Button type="submit" color="gold" size="medium">
            Atualizar meus dados
          </Button>
        </StyledForm>
      </StyleBackgroundModal>
    </AnimatePresence>
  );
};

export default ModalEditeClient;
