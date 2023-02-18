import { Request, Response, NextFunction } from 'express';
import JwtToken from "../utils/jwt.token";

export default class TokenMiddleware {
  public static async tokenValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (authorization === '' || authorization === undefined) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    const jwtdecode = JwtToken.verify(authorization as string);
    if (!jwtdecode) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next();
  }

  public static async roleAdminValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const jwtdecode = JwtToken.verify(authorization as string);
    if (jwtdecode.role !== 'admin') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }

  public static async roleUserValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const jwtdecode = JwtToken.verify(authorization as string);
    if (jwtdecode.role !== 'user') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }

  public static async roleAdminOrUserValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const jwtdecode = JwtToken.verify(authorization as string);
    if (jwtdecode.role !== 'admin' && jwtdecode.role !== 'user') {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
  }
}