import { db } from '../../db/in-memory.db';
import { Post } from '../../posts/types/posts';
import { BlogInputDTO } from '../dto/blog.dto';
import { Blog } from '../types/blogs';

class BlogsRepository {
  constructor(private readonly db: { blogs: Blog[]; posts: Post[] }) {}

  public findAll() {
    return this.db.blogs;
  }

  public findById(id: string) {
    return this.db.blogs.find((blog) => blog.id === id) ?? null;
  }

  public create(blog: BlogInputDTO) {
    const newBlog: Blog = {
      id: Date.now().toString(),
      ...blog,
    };
    this.db.blogs.push(newBlog);
    return newBlog;
  }

  public update(id: string, updatedBlog: BlogInputDTO) {
    const index = this.db.blogs.findIndex((blog) => blog.id === id);
    if (index === -1) {
      throw new Error(`Blog with id ${id} not found`);
    }

    this.db.blogs[index] = { ...this.db.blogs[index], ...updatedBlog };

    return this.db.blogs[index];
  }

  public delete(id: string) {
    const index = this.db.blogs.findIndex((blog) => blog.id === id);

    if (index === -1) {
      throw new Error(`Blog with id ${id} not found`);
    }

    this.db.blogs.splice(index, 1);

    return;
  }
}

export const blogsRepository = new BlogsRepository(db);
