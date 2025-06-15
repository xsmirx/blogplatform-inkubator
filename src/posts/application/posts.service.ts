import { ObjectId } from 'mongodb';
import { postsRepository } from '../repositories/posts.repository';
import { blogsRepository } from '../../blogs/repositories/blogs.repository';
import { Post } from '../types/posts';
import { PostInputDTO } from './dto/post.dto';

class PostsService {
  public async findMany() {
    return await postsRepository.findAll();
  }

  public async findById(id: string) {
    return await postsRepository.findByIdOrFail(id);
  }

  public async create(post: PostInputDTO) {
    const blog = await blogsRepository.findByIdOrFail(post.blogId);
    if (!blog) throw new Error(`Blog with id ${post.blogId} not found`);

    const newPost: Post = {
      ...post,
      blogId: new ObjectId(post.blogId),
      blogName: blog.name,
      createdAt: new Date().toISOString(),
    };
    const id = await postsRepository.create(newPost);
    return await postsRepository.findByIdOrFail(id);
  }

  public async update(id: string, post: PostInputDTO) {
    const blog = await blogsRepository.findByIdOrFail(post.blogId);
    if (!blog) throw new Error(`Blog with id ${post.blogId} not found`);

    const updatedPost: Omit<Post, 'createdAt'> = {
      ...post,
      blogId: new ObjectId(post.blogId),
      blogName: blog.name,
    };

    return await postsRepository.update(id, updatedPost);
  }

  public async delete(id: string) {
    return await postsRepository.delete(id);
  }
}

export const postsService = new PostsService();
