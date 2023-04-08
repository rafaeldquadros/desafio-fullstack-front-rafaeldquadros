import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ILogin } from "../pages/login";
import { IRegister } from "../pages/register";
import { BaseURL, headerAuthorizationConfig } from "../services/axios";

interface IUserContext {
  ValidPasswordRequest: (data: ILogin) => Promise<void>;
  LoginRequest: (data: ILogin) => Promise<ILoginResponse>;
  RegisterRequest: (data: any) => Promise<any>;
  ListContactsRequest: () => Promise<void>;
  searchContacts: any;
  setSearchContacts: any;
  contacts: any;
  setContacts: any;
  CreateContactRequest: (data: any) => Promise<any>;
  modalCreateContact: boolean;
  setModalCreateContact: React.Dispatch<React.SetStateAction<boolean>>;
  modalDeleteContact: boolean;
  setModalDeleteContact: React.Dispatch<React.SetStateAction<boolean>>;
  DeleteContactRequest: () => void;
  EditeContactRequest: (data: IContact) => void;
  contact: IContact;
  setContact: React.Dispatch<React.SetStateAction<IContact>>;
  modalEditeContact: boolean;
  setModalEditeContact: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  PerfilClientRequest: () => Promise<void>;
  modalEditeClient: boolean;
  setModalEditeClient: React.Dispatch<React.SetStateAction<boolean>>;
  EditeClientRequest: (data: IContact, type: string) => void;
  modalConfirmPassword: boolean;
  setModalConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  modalUpdatePassword: boolean;
  setModalUpdatePassword: React.Dispatch<React.SetStateAction<boolean>>;
  modalDeleteClient: boolean;
  setModalDeleteClient: React.Dispatch<React.SetStateAction<boolean>>;
  DeleteClientRequest: () => void;
}

interface IContact {
  id?: string;
  name?: string;
  email?: string;
  telefone?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IUser {
  id?: string;
  name?: string;
  email?: string;
  telefone?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IUserProps {
  children: ReactNode;
}

interface ILoginResponse {
  token: string;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider = ({ children }: IUserProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({} as IUser);
  const [contact, setContact] = useState({} as IContact);
  const [searchContacts, setSearchContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [modalCreateContact, setModalCreateContact] = useState(false);
  const [modalDeleteContact, setModalDeleteContact] = useState(false);
  const [modalEditeContact, setModalEditeContact] = useState(false);
  const [modalEditeClient, setModalEditeClient] = useState(false);
  const [modalConfirmPassword, setModalConfirmPassword] = useState(false);
  const [modalUpdatePassword, setModalUpdatePassword] = useState(false);
  const [modalDeleteClient, setModalDeleteClient] = useState(false);

  const PerfilClientRequest = async (): Promise<any> => {
    await BaseURL.get("/client/perfil", headerAuthorizationConfig())
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  const LoginRequest = async (data: ILogin): Promise<any> => {
    toast.promise(
      BaseURL.post("/session", data).then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }),
      {
        pending: "Logando...",
        success: "Login realizado com sucesso",
        error: "Email ou senha invalidos",
      }
    );
  };

  const ValidPasswordRequest = async (data: ILogin): Promise<any> => {
    toast.promise(
      BaseURL.post("/session", data).then((res) => {
        setModalConfirmPassword(false);
        setModalUpdatePassword(true);
      }),
      {
        pending: "Validando senha",
        success: "Senha validada",
        error: "Senha incorreta",
      }
    );
  };

  const RegisterRequest = async (data: IRegister): Promise<any> => {
    toast.promise(
      BaseURL.post("/client", data).then((res) => {
        navigate("/login");
      }),
      {
        pending: "Criando conta...",
        success: "Conta criada com sucesso",
        error: "Dados invalidos",
      }
    );
  };
  const ListContactsRequest = async (): Promise<any> => {
    await BaseURL.get("/contacts", headerAuthorizationConfig())
      .then((res) => {
        if (res.data) {
          setContacts(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const CreateContactRequest = async (data: any): Promise<any> => {
    toast.promise(
      BaseURL.post("/contacts", data, headerAuthorizationConfig())
        .then(async (res) => {
          await ListContactsRequest();
          setModalCreateContact(false);
        })
        .catch((err) => console.log(err)),
      {
        pending: "Criando contato...",
        success: "Contato criado com sucesso",
        error: "Dados invalidos",
      }
    );
  };

  const DeleteContactRequest = () => {
    toast.promise(
      BaseURL.delete(
        `/contacts/${localStorage.contactId}`,
        headerAuthorizationConfig()
      )
        .then(async (res) => {
          await ListContactsRequest();
          setModalDeleteContact(false);
        })
        .catch((err) => console.log(err)),
      {
        pending: "Deletando contato...",
        success: "Contato deletado com sucesso",
        error: "Dados invalidos",
      }
    );
  };

  const DeleteClientRequest = () => {
    toast.promise(
      BaseURL.delete(`/client`, headerAuthorizationConfig())
        .then(async (res) => {
          setModalDeleteClient(false);
          navigate("/login");
        })
        .catch((err) => console.log(err)),
      {
        pending: "Deletando sua conta...",
        success: "Conta deletada com sucesso",
        error: "Dados invalidos",
      }
    );
  };

  const EditeContactRequest = (data: IContact) => {
    toast.promise(
      BaseURL.patch(
        `/contacts/${localStorage.contactId}`,
        data,
        headerAuthorizationConfig()
      )
        .then(async (res) => {
          await ListContactsRequest();
          await PerfilClientRequest();
          setModalEditeContact(false);
        })
        .catch((err) => console.log(err)),
      {
        pending: "Atualizando contato...",
        success: "Contato atualizado com sucesso",
        error: "Dados invalidos",
      }
    );
  };

  const EditeClientRequest = (data: IContact, type: string) => {
    toast.promise(
      BaseURL.patch(`/client`, data, headerAuthorizationConfig())
        .then(async (res) => {
          await ListContactsRequest();
          setModalUpdatePassword(false);
          setModalEditeClient(false);
        })
        .catch((err) => console.log(err)),
      {
        pending: "Atualizando contato...",
        success: "Contato atualizado com sucesso",
        error: "Dados invalidos",
      }
    );
  };

  return (
    <UserContext.Provider
      value={{
        LoginRequest,
        RegisterRequest,
        ListContactsRequest,
        searchContacts,
        setSearchContacts,
        contacts,
        setContacts,
        CreateContactRequest,
        modalCreateContact,
        setModalCreateContact,
        modalDeleteContact,
        setModalDeleteContact,
        DeleteContactRequest,
        contact,
        setContact,
        modalEditeContact,
        setModalEditeContact,
        EditeContactRequest,
        user,
        setUser,
        PerfilClientRequest,
        modalEditeClient,
        setModalEditeClient,
        EditeClientRequest,
        modalConfirmPassword,
        setModalConfirmPassword,
        ValidPasswordRequest,
        modalUpdatePassword,
        setModalUpdatePassword,
        modalDeleteClient,
        setModalDeleteClient,
        DeleteClientRequest,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
