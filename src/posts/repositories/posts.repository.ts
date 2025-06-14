import { ObjectId, WithId } from 'mongodb';
import { blogCollection, postCollection } from '../../db/mongo.db';
import { PostInputDTO } from '../dto/post.dto';
import { Post } from '../types/posts';

class PostsRepository {
  public async findAll(): Promise<WithId<Post>[]> {
    return await postCollection.find().toArray();
  }

  public async findById(id: string): Promise<WithId<Post> | null> {
    return await postCollection.findOne({ _id: new ObjectId(id) });
  }

  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    const res = await postCollection.findOne({ _id: new ObjectId(id) });
    if (!res) {
      throw new Error(`Post with id ${id} not found`);
    }
    return res;
  }

  public async create(post: PostInputDTO) {
    const blog = await blogCollection.findOne({
      _id: new ObjectId(post.blogId),
    });
    if (!blog) throw new Error(`Blog with id ${post.blogId} not found`);

    const newPost: Post = {
      ...post,
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    const inserResult = await postCollection.insertOne(newPost);

    return inserResult.insertedId.toString();
  }

  public async update(id: string, post: Omit<Post, 'createdAt'>) {
    const updatedPost = await postCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...post, blogName: post.blogName } },
    );

    if (updatedPost.matchedCount === 0) {
      throw new Error(`Post with id ${id} not found`);
    }

    return;
  }

  public async delete(id: string) {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error(`Post with id ${id} not found`);
    }

    return;
  }
}

export const postsRepository = new PostsRepository();
