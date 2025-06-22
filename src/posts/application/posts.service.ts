import { ObjectId } from 'mongodb';
import { postsRepository } from '../repositories/posts.repository';
import { blogsRepository } from '../../blogs/repositories/blogs.repository';
import { Post } from '../types/posts';
import { PostInputDTO } from './dto/post.dto';
import { PostQueryInput } from '../routers/input/post-query-input';

class PostsService {
  public async findMany(postDto: PostQueryInput & { blogId?: string }) {
    return await postsRepository.findAll(postDto);
  }

  public async findById(id: string) {
    return await postsRepository.findByIdOrFail(id);
  }

  public async create(post: PostInputDTO) {
    const blog = await blogsRepository.findByIdOrFail(post.blogId);

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
