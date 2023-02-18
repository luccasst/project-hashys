import CallService from "../services/call.service";
import { Request, Response } from "express";
import JwtToken from "../utils/jwt.token";

export default class CallController {
  public static async createCall(req: Request, res: Response): Promise<Response | void>{
    try {
      const { title, comment, status, priority } = req.body;
      const { authorization } = req.headers;
      const jwtdecode = JwtToken.verify(authorization as string);
      const user = jwtdecode.id;
      const call = await CallService.createCall(title, comment, status, user, priority);
      res.status(201).json({ message: 'Call created', call });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async getAllCalls(_req: Request, res: Response): Promise<Response | void>{
    try {
      const calls = await CallService.getAllCalls();
      res.status(200).json({ message: 'All calls', calls });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async getCallById(req: Request, res: Response): Promise<Response | void>{
    try {
      const { id } = req.params;
      const call = await CallService.getCallById(Number(id));
      res.status(200).json({ message: 'Call found', call });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async updateCallById(req: Request, res: Response): Promise<Response | void>{
    try {
      const { id } = req.params;
      const { title, comment, status, priority } = req.body;
      const call = await CallService.updateCallById(Number(id), title, comment, status, priority);
      res.status(200).json({ message: 'Call updated', call });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public static async deleteCallById(req: Request, res: Response): Promise<Response | void>{
    try {
      const { id } = req.params;
      const call = await CallService.deleteCallById(Number(id));
      res.status(200).json({ message: 'Call deleted', call });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}