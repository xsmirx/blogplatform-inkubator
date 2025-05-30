import { Blog } from '../../blogs/types/blogs';
import { db } from '../../db/in-memory.db';
import { PostInputDTO } from '../dto/post.dto';
import { Post } from '../types/posts';

class PostsRepository {
  constructor(private readonly db: { blogs: Blog[]; posts: Post[] }) {}

  public findAll() {
    return this.db.posts;
  }

  public findById(id: string) {
    return this.db.posts.find((post) => post.id === id);
  }

  public create(post: PostInputDTO) {
    const newPost: Post = {
      id: Date.now().toString(),
      ...post,
    };
    this.db.posts.push(newPost);
    return newPost;
  }

  public update(id: string, updatedPost: PostInputDTO) {
    const index = this.db.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      throw new Error(`Post with id ${id} not found`);
    }

    this.db.posts[index] = { ...this.db.posts[index], ...updatedPost };

    return this.db.posts[index];
  }

  public delete(id: string) {
    const index = this.db.posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new Error(`Post with id ${id} not found`);
    }

    this.db.posts.splice(index, 1);

    return;
  }
}

export const postsRepository = new PostsRepository(db);
