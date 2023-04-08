export interface IClientCreate {
  id: string;
  name: string;
  email: string;
  telefone: string;
  createdAt: string;
  updatedAt: string;
}

export interface IClientLogin {
  email: string;
  password: string;
}
