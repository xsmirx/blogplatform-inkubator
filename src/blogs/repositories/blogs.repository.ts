import { Collection, ObjectId, WithId } from 'mongodb';
import { BlogInputDTO } from '../dto/blog.dto';
import { Blog } from '../types/blogs';
import { blogCollection } from '../../db/mongo.db';

class BlogsRepository {
  constructor(private readonly blogCollection: Collection<Blog>) {}

  public async findAll(): Promise<WithId<Blog>[]> {
    return this.blogCollection.find().toArray();
  }

  public findById(id: string): Promise<WithId<Blog> | null> {
    return this.blogCollection.findOne({ _id: new ObjectId(id) });
  }

  public async create(
    blog: BlogInputDTO & Pick<Blog, 'isMembership'>,
  ): Promise<WithId<Blog>> {
    const newBlog: Blog = {
      ...blog,
      createdAt: new Date().toISOString(),
    };
    const insertResult = await this.blogCollection.insertOne(newBlog);

    return { ...newBlog, _id: insertResult.insertedId };
  }

  public async update(id: string, blog: BlogInputDTO): Promise<void> {
    const updateResult = await this.blogCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...blog } },
    );

    if (updateResult.matchedCount === 0) {
      throw new Error(`Blog with id ${id} not found`);
    }

    return;
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await this.blogCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error(`Blog with id ${id} not found`);
    }

    return;
  }
}

export let blogsRepository: BlogsRepository;

export const initializeBlogsRepository = () => {
  blogsRepository = new BlogsRepository(blogCollection);
};
