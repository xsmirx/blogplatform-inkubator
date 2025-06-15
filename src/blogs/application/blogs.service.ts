import { BlogInputDTO } from './dto/blog.dto';
import { blogsRepository } from '../repositories/blogs.repository';
import { Blog } from '../types/blogs';

class BlogService {
  public async findMany() {
    return await blogsRepository.findAll();
  }

  public async findByIdOrFail(id: string) {
    return await blogsRepository.findByIdOrFail(id);
  }

  public async create(dto: BlogInputDTO) {
    const newBlog: Blog = {
      ...dto,
      createdAt: new Date().toISOString(),
      isMembership: false,
    };
    const id = await blogsRepository.create(newBlog);
    return await blogsRepository.findByIdOrFail(id);
  }

  public async update(id: string, dto: BlogInputDTO) {
    return await blogsRepository.update(id, dto);
  }

  public async delete(id: string) {
    return await blogsRepository.delete(id);
  }
}

export const blogsService = new BlogService();
