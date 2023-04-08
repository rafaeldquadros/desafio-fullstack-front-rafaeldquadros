import { hash } from "bcryptjs";
import AppDataSource from "../data-source";
import Client from "../entities/clients.entity";
import { IClientCreate } from "../interface/client.interface";
import { CreateUserSerializerWithoutPass } from "../serializers/client.serializers";

class ClientServices {
  static async create(data: any): Promise<IClientCreate> {
    const clientRepository = AppDataSource.getRepository(Client);

    const user: any = clientRepository.create(data);
    await clientRepository.save(user);

    const client: IClientCreate =
      await CreateUserSerializerWithoutPass.validate(user, {
        stripUnknown: true,
      });

    return client;
  }

  static async listOne(clientId: string): Promise<IClientCreate> {
    const clientRepository = AppDataSource.getRepository(Client);

    const user = await clientRepository.findOne({
      where: { id: clientId },
      relations: { contacts: true },
    });

    const client = await CreateUserSerializerWithoutPass.validate(user, {
      stripUnknown: true,
    });

    return client;
  }

  static async update(
    clientData: any,
    clientId: string
  ): Promise<IClientCreate> {
    const clientRepository = AppDataSource.getRepository(Client);

    const findclient = await clientRepository.findOneBy({
      id: clientId,
    });

    if (clientData.password !== undefined) {
      clientData.password = await hash(clientData.password, 10);
    }

    const clientUpdated = await clientRepository.update(
      findclient!.id,
      clientData
    );

    const { password, ...userWithoutPass } = (await clientRepository.findOneBy({
      id: clientId,
    })) as any;

    return userWithoutPass;
  }

  static async delete(id: string): Promise<any> {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.delete({
      id: id,
    });

    return client;
  }
}

export default ClientServices;
