import AuthService from "../services/auth.service";
import { Request, Response } from "express";
import JwtToken from "../utils/jwt.token";

export default class AuthController {
  public static async createUser(req: Request, res: Response): Promise<Response | void>{
    try {
      const { name, email, password, role } = req.body;
      const user = await AuthService.createUser(name, email, password, role);
      const token = JwtToken.sign({ id:user.id, email: user.email, role: user.role });
      res.status(201).json({ message: 'User created', token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async loginUser(req: Request, res: Response): Promise<Response | void>{
    try {
      const { email, password } = req.body;
      const user = await AuthService.loginUser(email, password);
      const token = JwtToken.sign({ id:user.id, email: user.email, role: user.role });
      res.status(200).json({ message: 'User logged in', token });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
