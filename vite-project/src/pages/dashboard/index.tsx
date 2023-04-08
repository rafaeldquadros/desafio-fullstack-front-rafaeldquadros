import {
  StyledBoxButtonsTitle,
  StyledBoxCategoriesAndBrandsAdmin,
  StyledBoxListAndSearch,
  StyledBoxUserButtons,
  StyledButtonMore,
  StyledCategoriesTitle,
  StyledList,
  StyledLogout,
  StyledWellcomeDesk,
} from "./style";
import { useEffect, useState } from "react";
import sum from "../../assets/moreCategories.png";
import more from "../../assets/moreWhite.png";
import less from "../../assets/lessWhite.png";
import { AnimatePresence } from "framer-motion";
import Contacts from "../../components/contacts";
import ModalCreateContact from "../../components/modals/createContact.modals";
import { useUser } from "../../context/user.context";
import ModalDeleteContact from "../../components/modals/modalDeleteContact.modals";
import ModalEditeContact from "../../components/modals/modalEditeContact.modals";
import { StyledBoxContact } from "../../components/contacts/style";

import key from "../../assets/key_FILL0_wght400_GRAD0_opsz48.svg";
import pen from "../../assets/pen.png";
import trash from "../../assets/trash.png";
import ModalEditeClient from "../../components/modals/modalEditeClient.modals";
import Icons from "../../services/icons";
import ModalConfirmPassword from "../../components/modals/modalConfirmPassword.modals";
import ModalUpdatePassword from "../../components/modals/modalUpdatePassword.modals";
import ModalDeleteClient from "../../components/modals/modalDeleteClient.modals";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [openListContacts, setOpenListContacts] = useState(false);
  const navigate = useNavigate();

  const {
    setModalCreateContact,
    modalCreateContact,
    modalDeleteContact,
    setModalDeleteContact,
    setModalEditeContact,
    modalEditeContact,
    PerfilClientRequest,
    user,
    modalEditeClient,
    setModalEditeClient,
    modalConfirmPassword,
    setModalConfirmPassword,
    modalUpdatePassword,
    setModalUpdatePassword,
    modalDeleteClient,
    setModalDeleteClient,
  } = useUser();

  const { ProtectionRoute } = useAuth();

  const handleList = () => {
    return setOpenListContacts(!openListContacts);
  };

  useEffect(() => {
    (async () => {
      const response = await PerfilClientRequest();
    })();
  }, [modalEditeClient]);

  useEffect(() => {
    ProtectionRoute();
  }, []);
  return (
    <>
      <StyledBoxCategoriesAndBrandsAdmin>
        <StyledWellcomeDesk>
          <h2>
            Bem vindo {user.name !== undefined && user.name}, este são seus
            contatos
          </h2>
          <StyledLogout
            color="red"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <Icons.Logout />
          </StyledLogout>

          {user && (
            <>
              <StyledBoxContact>
                <h2>Name:</h2>
                <p>{user && user.name}</p>
              </StyledBoxContact>
              <StyledBoxContact>
                <h2>Email:</h2>
                <p>{user && user.email}</p>
              </StyledBoxContact>
              <StyledBoxContact>
                <h2>Telefone:</h2>
                <p>
                  {user.telefone !== undefined && (
                    <>
                      {user.telefone![0]}
                      {user.telefone![1]}
                      {user.telefone!.slice(2, user && user.telefone!.length)}
                    </>
                  )}
                </p>
              </StyledBoxContact>
            </>
          )}
          <StyledBoxUserButtons>
            <StyledButtonMore
              color="goldOne"
              onClick={() => {
                setModalConfirmPassword(!modalConfirmPassword);
              }}
            >
              <img src={key} alt="" />
            </StyledButtonMore>
            <StyledButtonMore
              onClick={() => {
                setModalEditeClient(!modalEditeClient);
              }}
            >
              <img src={pen} alt="" />
            </StyledButtonMore>
            <StyledButtonMore color="red">
              <img
                src={trash}
                alt=""
                onClick={() => {
                  setModalDeleteClient(true);
                }}
              />
            </StyledButtonMore>
          </StyledBoxUserButtons>
        </StyledWellcomeDesk>
        <StyledCategoriesTitle>
          <h1>Contatos</h1>
          <StyledBoxButtonsTitle>
            <StyledButtonMore
              onClick={() => setModalCreateContact(!modalCreateContact)}
            >
              <img src={sum} alt="" />
            </StyledButtonMore>
            <StyledButtonMore onClick={() => handleList()} color="gold">
              <img src={openListContacts ? less : more} alt="" />
            </StyledButtonMore>
          </StyledBoxButtonsTitle>
        </StyledCategoriesTitle>
        <AnimatePresence>
          {openListContacts && (
            <StyledBoxListAndSearch>
              <StyledList
                initial={{ opacity: "0%" }}
                transition={{ duration: 0.5 }}
                animate={{ opacity: "100%" }}
                exit={{ opacity: "0%" }}
              >
                <Contacts admin="admin" />
              </StyledList>
            </StyledBoxListAndSearch>
          )}
        </AnimatePresence>
      </StyledBoxCategoriesAndBrandsAdmin>
      {modalCreateContact && (
        <ModalCreateContact close={setModalCreateContact} />
      )}
      {modalDeleteContact && (
        <ModalDeleteContact close={setModalDeleteContact} />
      )}
      {modalEditeContact && <ModalEditeContact close={setModalEditeContact} />}
      {modalEditeClient && <ModalEditeClient close={setModalEditeClient} />}
      {modalConfirmPassword && (
        <ModalConfirmPassword close={setModalConfirmPassword} />
      )}
      {modalUpdatePassword && (
        <ModalUpdatePassword close={setModalUpdatePassword} />
      )}
      {modalDeleteClient && <ModalDeleteClient close={setModalDeleteClient} />}
    </>
  );
};
export default Dashboard;
