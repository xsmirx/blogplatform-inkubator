import { userCollection } from '../../db/mongo.db';
import { UserDB } from '../types/user-db';

class UserRepository {
  public async createUser(user: UserDB) {
    const insertedResult = await userCollection.insertOne(user);
    return insertedResult.insertedId.toString();
  }
}

export const userRepository = new UserRepository();
