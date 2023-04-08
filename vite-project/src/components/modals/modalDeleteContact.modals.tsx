import { AnimatePresence } from "framer-motion";
import Button from "../button";
import { StyledForm } from "../form/style";
import { StyleBackgroundModal, StyledButtonClose } from "./style";
import Icons from "../../services/icons";
import { useUser } from "../../context/user.context";

interface IModalDeleteContact {
  close: any;
}

const ModalDeleteContact = ({ close }: IModalDeleteContact) => {
  const { DeleteContactRequest } = useUser();
  return (
    <AnimatePresence>
      <StyleBackgroundModal>
        <StyledForm
          initial={{ y: "-100%" }}
          transition={{ duration: 0.5 }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
        >
          <h2>Apagar contato?</h2>
          <StyledButtonClose type="button" onClick={() => close(false)}>
            <Icons.Close />
          </StyledButtonClose>
          <Button
            onclick={() => {
              DeleteContactRequest();
            }}
            type="button"
            color="red"
            size="medium"
          >
            Remover
          </Button>
        </StyledForm>
      </StyleBackgroundModal>
    </AnimatePresence>
  );
};

export default ModalDeleteContact;
