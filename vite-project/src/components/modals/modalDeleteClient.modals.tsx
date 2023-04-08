import { AnimatePresence } from "framer-motion";
import Button from "../button";
import { StyledForm } from "../form/style";
import { StyleBackgroundModal, StyledButtonClose } from "./style";
import Icons from "../../services/icons";
import { useUser } from "../../context/user.context";

interface IModalDeleteContact {
  close: any;
}

const ModalDeleteClient = ({ close }: IModalDeleteContact) => {
  const { DeleteClientRequest } = useUser();
  return (
    <AnimatePresence>
      <StyleBackgroundModal>
        <StyledForm
          initial={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
        >
          <h2>Apagar sua conta permanentemente?</h2>
          <StyledButtonClose type="button" onClick={() => close(false)}>
            <Icons.Close />
          </StyledButtonClose>
          <Button
            onclick={() => {
              DeleteClientRequest();
            }}
            type="button"
            color="red"
            size="medium"
          >
            Deletar minha conta
          </Button>
        </StyledForm>
      </StyleBackgroundModal>
    </AnimatePresence>
  );
};

export default ModalDeleteClient;
