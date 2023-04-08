import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseURL, headerAuthorizationConfig } from "../services/axios";
interface IAuthContext {
  AutoLogin: () => Promise<void>;
  ProtectionRoute: () => Promise<void>;
}

interface IAuthProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProps) => {
  const navigate = useNavigate();

  const AutoLogin = async () => {
    await BaseURL.get("/client/perfil", headerAuthorizationConfig())
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const ProtectionRoute = async () => {
    await BaseURL.get("/client/perfil", headerAuthorizationConfig())
      .then((res) => {})
      .catch((err) => navigate("/login"));
  };

  return (
    <AuthContext.Provider value={{ AutoLogin, ProtectionRoute }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
