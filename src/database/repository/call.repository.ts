import { AppDataSource } from "../data-source";
import { Call } from "../entity/call.entity";

export const callRepository = AppDataSource.getRepository(Call);