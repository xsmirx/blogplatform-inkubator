import { Filter, ObjectId, WithId } from 'mongodb';
import { postCollection } from '../../db/mongo.db';
import { Post } from '../types/posts';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';
import { PostQueryInput } from '../routers/input/post-query-input';

class PostsRepository {
  public async findAll(queryDto: PostQueryInput & { blogId?: string }) {
    const { blogId, sortBy, sortDirection, pageNumber, pageSize } = queryDto;

    const filter: Filter<Post> = {};

    if (blogId) {
      filter.blogId = { $eq: new ObjectId(blogId) };
    }

    const skip = (pageNumber - 1) * pageSize;

    const items = await postCollection
      .find(filter)
      .sort(sortBy, sortDirection)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await postCollection.countDocuments(filter);

    return { items, totalCount };
  }

  public async findById(id: string): Promise<WithId<Post> | null> {
    return await postCollection.findOne({ _id: new ObjectId(id) });
  }

  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    const res = await postCollection.findOne({ _id: new ObjectId(id) });
    if (!res) {
      throw new RepositoryNotFoundError(`Post with id ${id} not found`);
    }
    return res;
  }

  public async create(post: Post) {
    const inserResult = await postCollection.insertOne(post);
    return inserResult.insertedId.toString();
  }

  public async update(id: string, post: Omit<Post, 'createdAt'>) {
    const updatedPost = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...post, blogName: post.blogName } },
    );

    if (updatedPost.matchedCount === 0) {
      throw new RepositoryNotFoundError(`Post with id ${id} not found`);
    }

    return;
  }

  public async delete(id: string) {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      throw new RepositoryNotFoundError(`Post with id ${id} not found`);
    }

    return;
  }
}

export const postsRepository = new PostsRepository();
