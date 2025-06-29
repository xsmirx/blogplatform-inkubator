import { ObjectId, WithId } from 'mongodb';
import { userCollection } from '../../db/mongo.db';
import { UserDB } from '../types/user-db';
import { UserViewModel } from '../types/user-view-model';

class UsersQueryRepository {
  public async findUserById(userId: string) {
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    return user ? this.mapUserToViewModel(user) : null;
  }

  public async findUserByLoginOrEmail(loginOrEmail: string) {
    const user = await userCollection.findOne({
      $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
    });

    return user ? this.mapUserToViewModel(user) : null;
  }

  private mapUserToViewModel(user: WithId<UserDB>): UserViewModel {
    return {
      id: user._id.toString(),
      login: user.login,
      email: user.email,
      createdAt: user._id.getTimestamp().toISOString(),
    };
  }
}

export const usersQueryRepository = new UsersQueryRepository();
