import { ObjectId } from 'mongodb';
import { blogCollection } from '../../db/mongo.db';
import { postsRepository } from '../repositories/posts.repository';
import { PostInputDTO } from '../dto/post.dto';
import { Post } from '../types/posts';

class PostService {
  public async findMany() {
    return await postsRepository.findAll();
  }

  public async findById(id: string) {
    return await postsRepository.findByIdOrFail(id);
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
    return await postsRepository.create(newPost);
  }

  public async update(id: string, post: PostInputDTO) {
    const blog = await blogCollection.findOne({
      _id: new ObjectId(post.blogId),
    });
    if (!blog) throw new Error(`Blog with id ${post.blogId} not found`);

    const updatedPost: Omit<Post, 'createdAt'> = {
      ...post,
      blogName: blog.name,
    };

    return await postsRepository.update(id, updatedPost);
  }

  public async delete(id: string) {
    return await postsRepository.delete(id);
  }
}

export const postService = new PostService();
