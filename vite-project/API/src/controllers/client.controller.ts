import { Request, Response } from "express";
import { IClientCreate } from "../interface/client.interface";
import ClientService from "../services/client.services";

class ClientController {
  static async create(req: Request, res: Response) {
    const data = req.body;
    const response: IClientCreate = await ClientService.create(data);
    return res.status(201).json(response);
  }

  static async listOne(req: Request, res: Response) {
    const clientId = req.user.id;
    const response: IClientCreate = await ClientService.listOne(clientId);

    return res.status(201).json(response);
  }

  static async update(req: Request, res: Response) {
    const clientData = req.body;
    const clientId: string = req.user.id;
    const response: IClientCreate = await ClientService.update(
      clientData,
      clientId
    );

    return res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const clientId = req.user.id;
    const response = await ClientService.delete(clientId);

    return res.status(204).json(response);
  }
}

export default ClientController;
