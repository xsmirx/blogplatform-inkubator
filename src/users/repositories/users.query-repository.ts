import { Filter, ObjectId, WithId } from 'mongodb';
import { userCollection } from '../../db/mongo.db';
import { UserDB } from '../types/user-db';
import { UserViewModel } from '../types/user-view-model';
import { UserQueryInput } from '../routers/inputs/user-query-input';
import { UserSortFields } from '../routers/inputs/user-sort-fields';

class UsersQueryRepository {
  public async findUserById(userId: string) {
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    return user ? this.mapUserToViewModel(user) : null;
  }

  public async findAll(queries: UserQueryInput) {
    const {
      searchEmailTerm,
      searchLoginTerm,
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
    } = queries;

    const filter: Filter<UserDB> = {};

    if (searchEmailTerm) {
      filter.email = { $regex: searchEmailTerm, $options: 'i' };
    }
    if (searchLoginTerm) {
      filter.login = { $regex: searchLoginTerm, $options: 'i' };
    }

    const sort = sortBy === UserSortFields.createdAt ? '_id' : sortBy;

    const skip = (pageNumber - 1) * pageSize;

    const users = await userCollection
      .find(filter)
      .sort(sort, sortDirection)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await this.countUsers(queries);

    return this.mapUsersToPaginatedViewModel(users, queries, totalCount);
  }

  private async countUsers(queries: UserQueryInput) {
    const { searchEmailTerm, searchLoginTerm } = queries;

    const filter: Filter<UserDB> = {};

    if (searchEmailTerm) {
      filter.email = { $regex: searchEmailTerm, $options: 'i' };
    }
    if (searchLoginTerm) {
      filter.login = { $regex: searchLoginTerm, $options: 'i' };
    }

    return await userCollection.countDocuments(filter);
  }

  private mapUserToViewModel(user: WithId<UserDB>): UserViewModel {
    return {
      id: user._id.toString(),
      login: user.login,
      email: user.email,
      createdAt: user._id.getTimestamp().toISOString(),
    };
  }

  private async mapUsersToPaginatedViewModel(
    items: WithId<UserDB>[],
    queries: UserQueryInput,
    totalCount: number,
  ) {
    return {
      pageCount: Math.ceil(totalCount / queries.pageSize),
      page: queries.pageNumber,
      pageSize: queries.pageSize,
      totalCount,
      items: items.map((user) => this.mapUserToViewModel(user)),
    };
  }
}

export const usersQueryRepository = new UsersQueryRepository();
