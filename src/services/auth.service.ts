import { userRepository } from "../database/repository/user.repository";
import User from "../interface/user.interface";
import * as bcrypt from 'bcrypt';

export default class AuthService {
  public static async createUser(name: string, email: string, password: string, role: string): Promise<User> {
    const findUser = await userRepository.findOneBy({ email });
    if (findUser) {
      throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' ? 'admin' : 'user';

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
      role: userRole
    });
    if (!user) {
      throw new Error('User not created');
    } else {
      const savedUser = await userRepository.save(user);
      return savedUser;
    }
  }

  public static async loginUser(email: string, password: string): Promise<User> {
    const findUser = await userRepository.findOne ({ where: { email: email }});
    if (!findUser) {
      throw new Error('User not found');
    }
    const isPasswordValid = bcrypt.compareSync(password, findUser.password);
    if (!isPasswordValid) {
      throw new Error('Incorrect password');
    }
    return findUser;
  }

};