import AppDataSource from "../data-source";
import Client from "../entities/clients.entity";
import Contact from "../entities/contacts..entity";
import AppError from "../errors/appError";
import { IClientCreate } from "../interface/client.interface";
import { IContact } from "../interface/contacts.interface";
import { CreateContactsSerializerWithoutPassword } from "../serializers/contacts.serializers";

class ContactsServices {
  static async create(data: any, clientId: string): Promise<IClientCreate> {
    const clientRepository = AppDataSource.getRepository(Client);
    const contactsRepository = AppDataSource.getRepository(Contact);

    const client = await clientRepository.findOne({
      where: { id: clientId },
    });

    data.user = client;

    const contact: any = contactsRepository.create(data);
    await contactsRepository.save(contact);

    const contacts: IClientCreate =
      await CreateContactsSerializerWithoutPassword.validate(contact, {
        stripUnknown: true,
      });

    return contacts;
  }

  static async listAll(clientId: string): Promise<IContact[]> {
    const clientRepository = AppDataSource.getRepository(Client);

    const client: any = await clientRepository.findOne({
      where: { id: clientId },
      relations: { contacts: true },
    });

    return client.contacts;
  }

  static async listOne(
    contactId: string,
    clientId: string
  ): Promise<IContact[]> {
    const clientRepository = AppDataSource.getRepository(Client);
    const contactRepository = AppDataSource.getRepository(Contact);

    const client: any = await clientRepository.findOne({
      where: { id: clientId },
    });

    const contact: any = await contactRepository.findOne({
      where: { id: contactId },
      relations: { user: true },
    });

    if (contact.user.id !== client.id) {
      throw new AppError("This contact is not yours", 409);
    }

    delete contact.user;

    return contact;
  }

  static async update(
    contactData: object,
    contactId: string,
    clientId: string
  ): Promise<IContact> {
    const clientRepository = AppDataSource.getRepository(Client);
    const contactRepository = AppDataSource.getRepository(Contact);

    const client: any = await clientRepository.findOne({
      where: { id: clientId },
    });

    const contact: any = await contactRepository.findOne({
      where: { id: contactId },
      relations: { user: true },
    });

    if (contact.user.id !== client.id) {
      throw new AppError("This contact is not yours", 409);
    }

    const contactUpdated: any = contactRepository.create({
      ...contact,
      ...contactData,
    });

    await contactRepository.save(contactUpdated);

    delete contactUpdated.user;

    return contactUpdated;
  }

  static async delete(contactId: string, clientId: string): Promise<any> {
    const contactRepository = AppDataSource.getRepository(Contact);
    const clientRepository = AppDataSource.getRepository(Client);

    const client: any = await clientRepository.findOne({
      where: { id: clientId },
    });

    const contact: any = await contactRepository.findOne({
      where: { id: contactId },
      relations: { user: true },
    });

    if (contact.user.id !== client.id) {
      throw new AppError("This contact is not yours", 409);
    }

    const contactDeleted = await contactRepository.delete({
      id: contactId,
    });

    return contactDeleted;
  }
}

export default ContactsServices;
