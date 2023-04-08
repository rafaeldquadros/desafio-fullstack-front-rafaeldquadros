import { Request, Response } from "express";
import { IContact } from "../interface/contacts.interface";
import ContactsServices from "../services/contacts.services";

class ContactsController {
  static async create(req: Request, res: Response) {
    const data = req.body;
    const clientId = req.user.id;
    const response: any = await ContactsServices.create(data, clientId);
    return res.status(201).json(response);
  }

  static async listAll(req: Request, res: Response) {
    const clientId = req.user.id;
    const response: IContact[] = await ContactsServices.listAll(clientId);

    return res.status(201).json(response);
  }

  static async listOne(req: Request, res: Response) {
    const clientId = req.user.id;
    const contactId = req.params.id;
    const response: IContact[] = await ContactsServices.listOne(
      contactId,
      clientId
    );

    return res.status(201).json(response);
  }

  static async update(req: Request, res: Response) {
    const contactData: object = req.body;
    const contactId: string = req.params.id;
    const clientId: string = req.user.id;
    const response: IContact = await ContactsServices.update(
      contactData,
      contactId,
      clientId
    );

    return res.status(200).json(response);
  }

  static async delete(req: Request, res: Response) {
    const clientId = req.user.id;
    const contactId = req.params.id;
    const response = await ContactsServices.delete(contactId, clientId);

    return res.status(204).json(response);
  }
}

export default ContactsController;
