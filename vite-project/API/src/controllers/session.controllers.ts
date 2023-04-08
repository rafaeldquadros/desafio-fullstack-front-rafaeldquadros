import { Request, Response } from "express";
import { IClientLogin } from "../interface/client.interface";
import SessionServices from "../services/session.services";

class SessionControllers {
  static async login(req: Request, res: Response) {
    const userData: IClientLogin = req.body;
    const token = await SessionServices.login(userData);

    return res.json({ token });
  }
}
export default SessionControllers;
