import { ObjectId, WithId } from 'mongodb';
import { BlogInputDTO } from '../dto/blog.dto';
import { Blog } from '../types/blogs';
import { blogCollection } from '../../db/mongo.db';

class BlogsRepository {
  public async findAll(): Promise<WithId<Blog>[]> {
    return blogCollection.find().toArray();
  }

  public findById(id: string): Promise<WithId<Blog> | null> {
    return blogCollection.findOne({ _id: new ObjectId(id) });
  }

  public async create(
    blog: BlogInputDTO & Pick<Blog, 'isMembership'>,
  ): Promise<WithId<Blog>> {
    const newBlog: Blog = {
      ...blog,
      createdAt: new Date().toISOString(),
    };
    const insertResult = await blogCollection.insertOne({ ...newBlog });

    return { ...newBlog, _id: insertResult.insertedId };
  }

  public async update(id: string, blog: BlogInputDTO): Promise<void> {
    const updateResult = await blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...blog } },
    );

    if (updateResult.matchedCount === 0) {
      throw new Error(`Blog with id ${id} not found`);
    }

    return;
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error(`Blog with id ${id} not found`);
    }

    return;
  }
}

export const blogsRepository = new BlogsRepository();
