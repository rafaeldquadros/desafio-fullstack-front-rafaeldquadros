import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import pen from "../../assets/pen.png";
import trash from "../../assets/trash.png";
import { useUser } from "../../context/user.context";
import {
  StyledBoxButtons,
  StyledButtonMore,
} from "../../pages/dashboard/style";
import { StyledBoxContact } from "./style";

export interface IAdminCategories {
  admin?: string;
}

const Contacts = ({ admin }: IAdminCategories) => {
  const navigate = useNavigate();
  const {
    ListContactsRequest,
    searchContacts,
    setSearchContacts,
    contacts,
    setContacts,
    setModalDeleteContact,
    setModalEditeContact,
    modalEditeContact,
    modalDeleteContact,
    setContact,
    contact,
  } = useUser();

  useEffect(() => {
    (async () => {
      const contacts: any = await ListContactsRequest();

      setContacts(contacts.data);
    })();
  }, []);
  return (
    <>
      {searchContacts.length > 0
        ? searchContacts.map((element: any) => (
            <li id={element.id} key={element.id}>
              <h1>Name:</h1>
              <Link
                className="subMenu"
                key={element.id}
                id={element.id}
                to={"/produtos/todos"}
              >
                {element.name}
              </Link>
              {admin === "admin" && (
                <StyledBoxButtons>
                  <StyledButtonMore>
                    <img src={pen} alt="" />
                  </StyledButtonMore>
                  <StyledButtonMore>
                    <img src={trash} alt="" />
                  </StyledButtonMore>
                </StyledBoxButtons>
              )}
            </li>
          ))
        : contacts.length > 0 &&
          contacts.map((element: any) => (
            <li id={element.id}>
              <a className="subMenu" key={element.id} id={element.id}>
                <StyledBoxContact>
                  <h2>Name:</h2>
                  <p>{element.name}</p>
                </StyledBoxContact>
                <StyledBoxContact>
                  <h2>Email:</h2>
                  <p>{element.email}</p>
                </StyledBoxContact>
                <StyledBoxContact>
                  <h2>Telefone:</h2>
                  <p>
                    ({element.telefone[0]}
                    {element.telefone[1]})
                    {element.telefone.slice(2, element.telefone.length)}
                  </p>
                </StyledBoxContact>
              </a>
              {admin === "admin" && (
                <StyledBoxButtons>
                  <StyledButtonMore
                    onClick={() => {
                      setContact(element);
                      localStorage.setItem("contactId", element.id);
                      setModalEditeContact(!modalEditeContact);
                    }}
                  >
                    <img src={pen} alt="" />
                  </StyledButtonMore>
                  <StyledButtonMore color="red">
                    <img
                      src={trash}
                      alt=""
                      onClick={() => {
                        localStorage.setItem("contactId", element.id);
                        setModalDeleteContact(true);
                      }}
                    />
                  </StyledButtonMore>
                </StyledBoxButtons>
              )}
            </li>
          ))}
    </>
  );
};
export default Contacts;
