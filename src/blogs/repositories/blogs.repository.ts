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

  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    const res = await blogCollection.findOne({ _id: new ObjectId(id) });
    if (!res) {
      throw new Error(`Blog with id ${id} not found`);
    }
    return res;
  }

  public async create(blog: Blog) {
    const insertResult = await blogCollection.insertOne(blog);
    return insertResult.insertedId.toString();
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
