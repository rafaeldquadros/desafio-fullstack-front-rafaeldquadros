import AppDataSource from "../data-source";
import Client from "../entities/clients.entity";
import jwt from "jsonwebtoken";
import AppError from "../errors/appError";
import { Request, Response, NextFunction } from "express";
import Contact from "../entities/contacts..entity";

class Middlewares {
  static async Auth(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization;

    if (!token) {
      throw new AppError("Invalid token", 401);
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
      if (error) {
        throw new AppError(error.message, 401);
      }
      req.user = {
        id: decoded.sub,
      };
      return next();
    });
  }

  static async EnsureClientDontExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const clientRepository: any = AppDataSource.getRepository(Client);

    if (req.body.email) {
      const client: any = await clientRepository.findOneBy({
        email: req.body.email,
      });
      if (client) {
        throw new AppError("This client already exists", 409);
      }
    }

    return next();
  }

  static async EnsureContactDontExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const contactRepository: any = AppDataSource.getRepository(Contact);

    const contact: any = await contactRepository.findOneBy({
      email: req.body.email,
    });

    if (contact) {
      throw new AppError("This contact already exists", 409);
    }
    return next();
  }

  static async UpdateData(req: Request, res: Response, next: NextFunction) {
    if (req.body.id !== undefined) {
      throw new AppError("You dont update this!", 401);
    }

    return next();
  }

  static async EnsureUserExists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const clientRepository = AppDataSource.getRepository(Client);

    const client = await clientRepository.findOneBy({
      id: req.user.id,
    });

    if (!client) {
      throw new AppError("User dont exists", 404);
    }

    return next();
  }
}

export default Middlewares;
