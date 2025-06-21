import { Filter, ObjectId, WithId } from 'mongodb';
import { BlogInputDTO } from '../application/dto/blog.dto';
import { Blog } from '../types/blogs';
import { blogCollection } from '../../db/mongo.db';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';
import { BlogQueryInput } from '../routers/input/blog-query.input';

class BlogsRepository {
  public async findAll(queryDto: BlogQueryInput) {
    const { searchNameTerm, sortBy, sortDirection, pageNumber, pageSize } =
      queryDto;

    const skip = (pageNumber - 1) * pageSize;

    const filter: Filter<Blog> = {};

    console.log('searchNameTerm', searchNameTerm, typeof searchNameTerm);
    console.log('sortBy', sortBy, typeof sortBy);
    console.log('sortDirection', sortDirection, typeof sortDirection);
    console.log('pageNumber', pageNumber, typeof pageNumber);
    console.log('pageSize', pageSize, typeof pageSize);

    if (searchNameTerm) {
      filter.name = { $regex: searchNameTerm, $options: 'i' };
    }
    const items = await blogCollection
      .find(filter)
      .sort(sortBy, sortDirection)
      .skip(skip)
      .limit(pageSize)
      .toArray();

    const totalCount = await blogCollection.countDocuments(filter);

    return { items, totalCount };
  }

  public findById(id: string): Promise<WithId<Blog> | null> {
    return blogCollection.findOne({ _id: new ObjectId(id) });
  }

  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    const res = await blogCollection.findOne({ _id: new ObjectId(id) });
    if (!res) {
      throw new RepositoryNotFoundError(`Blog with id ${id} not found`);
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
      throw new RepositoryNotFoundError(`Blog with id ${id} not found`);
    }

    return;
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await blogCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      throw new RepositoryNotFoundError(`Blog with id ${id} not found`);
    }

    return;
  }
}

export const blogsRepository = new BlogsRepository();
