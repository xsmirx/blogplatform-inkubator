import { ObjectId } from 'mongodb';
import { userCollection } from '../../db/mongo.db';
import { UserDB } from '../types/user-db';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';

class UsersRepository {
  public async findUserByLoginOrEmail(loginOrEmail: string) {
    return await userCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  }

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

  public async deleteUser(id: string) {
    const { deletedCount } = await userCollection.deleteOne({
      _id: new ObjectId(id),
    });
    if (deletedCount === 0) {
      throw new RepositoryNotFoundError('User not found');
    }
  }
}

export const usersRepository = new UsersRepository();
