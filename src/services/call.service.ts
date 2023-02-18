import { callRepository } from "../database/repository/call.repository";
import { userRepository } from "../database/repository/user.repository";
import Call from "../interface/call.interface";


export default class CallService {
  public static async createCall(title: string, comment: string, status: string, user: number, priority: string): Promise<Call> {
    const findUserById = await userRepository.findOneBy({ id: user });
    if (!findUserById) {
      throw new Error('User not found');
    }
    const newCall = callRepository.create({ title, comment, status, user, priority });

    if (!newCall) {
      throw new Error('Call not created');
    } else {
      const savedCall = await callRepository.save(newCall);
      return savedCall;
    }
  }

  public static async getAllCalls(): Promise<Call[] | void> {
    const calls = await callRepository.createQueryBuilder('call')
      .leftJoinAndSelect('call.user', 'user')
      .select(['call.id', 'call.title', 'call.comment', 'call.status', 'call.priority', 'user.email'])
      .getMany();
    if (!calls) {
      throw new Error('Calls not found');
    }
    return calls;
  }

  public static async getCallById(id: number): Promise<Call | void> {
    const call = await callRepository.findOne({ where: { id: id } });
    if (!call) {
      throw new Error('Call not found');
    }
    return call;
  }

  public static async updateCallById(id: number, title: string, comment: string, status: string, priority: string): Promise<Call | void> {
    const call = await callRepository.createQueryBuilder('call')
    .leftJoinAndSelect('call.user', 'user')
    .select(['call.id', 'call.title', 'call.comment', 'call.status', 'call.priority', 'user.email'])
    .where('call.id = :id', { id: id })
    .getOne();
    if (!call) {
      throw new Error('Call not found');
    }
    call.title = title;
    call.comment = comment;
    call.status = status;
    call.priority = priority;
    const updatedCall = await callRepository.save(call);
    return updatedCall;
  }

  public static async deleteCallById(id: number): Promise<Call | void> {
    const call = await callRepository.createQueryBuilder('call')
    .leftJoinAndSelect('call.user', 'user')
    .select(['call.id', 'call.title', 'call.comment', 'call.status', 'call.priority', 'user.email'])
    .where('call.id = :id', { id: id })
    .getOne();
    if (!call) {
      throw new Error('Call not found');
    }
    const deletedCall = await callRepository.remove(call);
    return deletedCall;
  }
}