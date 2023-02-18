import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { userRepository } from "../database/repository/user.repository";

export default class AuthMiddleware {
  public static emailValidation(req: Request, res: Response, next: NextFunction) {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const { email } = req.body;
    if (email === '' || email === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  public static async passwordValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (password === '' || password === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const userPassword = await userRepository.findOne ({ where: { email: email }});
    if (userPassword) {
      const isPasswordValid = bcrypt.compareSync(password, userPassword.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }
    next();
  }

  public static async roleValidation(req: Request, res: Response, next: NextFunction) {
    const { role } = req.body;
    if (role === '' || role === undefined) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (role !== 'admin' && role !== 'user') {
      return res.status(401).json({ message: 'Incorrect role' });
    }
    next();
  }
}