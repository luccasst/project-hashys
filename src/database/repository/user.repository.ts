import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";

export const userRepository = AppDataSource.getRepository(User);