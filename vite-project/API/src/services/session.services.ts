import { compare } from "bcryptjs";
import AppDataSource from "../data-source";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../errors/appError";
import Client from "../entities/clients.entity";

class SessionServices {
  static async login({ email, password }: any): Promise<string> {
    const userRepository = AppDataSource.getRepository(Client);

    const user = await userRepository.findOneBy({
      email: email,
    });

    console.log(user);

    if (!user) {
      throw new AppError("Email or password invalid", 403);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password invalid", 403);
    }

    const token = jwt.sign({}, process.env.SECRET_KEY!, {
      subject: user.id,
      expiresIn: "24h",
    });

    return token;
  }
}

export default SessionServices;
