import { userCollection } from '../../db/mongo.db';
import { UserDB } from '../types/user-db';

class UserRepository {
  public async findUserByEmail(email: string) {
    return await userCollection.findOne({ email });
  }
  public async findUserByLogin(login: string) {
    return await userCollection.findOne({ login });
  }

  public async createUser(user: UserDB) {
    const insertedResult = await userCollection.insertOne(user);
    return insertedResult.insertedId.toString();
  }
}

export const userRepository = new UserRepository();
