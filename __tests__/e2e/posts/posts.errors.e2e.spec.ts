import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { PostInputDTO } from '../../../src/posts/dto/post.dto';
import { BlogInputDTO } from '../../../src/blogs/dto/blog.dto';

describe('Posts API - Authorization and Not Found Errors', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;
  let postId: string | null = null;

  beforeAll(async () => {
    await clearDb(app);

    // Create a blog first, since posts need a blogId
    const testBlog = {
      name: 'Test Blog',
      description: 'This is a test blog for posts testing',
      websiteUrl: 'https://testblogforposts.com',
    } satisfies BlogInputDTO;

    const blogResponse = await request(app)
      .post('/blogs')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testBlog)
      .expect(201);

    blogId = blogResponse.body.id;

    // Create a post for testing authorization and 404 errors
    const testPost = {
      title: 'Test Post',
      shortDescription: 'This is a test post for error testing',
      content: 'This is the content of the test post for error testing',
      blogId: blogId!,
    } satisfies PostInputDTO;

    const postResponse = await request(app)
      .post('/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testPost)
      .expect(201);

    postId = postResponse.body.id;
  });

  // Authorization tests (401 errors)
  it('should return 401 for unauthorized user; POST /posts', async () => {
    const testPost = {
      title: 'Unauthorized Post',
      shortDescription: 'This post should not be created',
      content: 'Content of unauthorized post',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app).post('/posts').send(testPost).expect(401);
  });

  it('should return 401 for unauthorized user; PUT /posts/:id', async () => {
    const updatedTestPost = {
      title: 'Updated Unauthorized Post',
      shortDescription: 'This post should not be updated',
      content: 'Updated content of unauthorized post',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .put(`/posts/${postId}`)
      .send(updatedTestPost)
      .expect(401);
  });

  it('should return 401 for unauthorized user; DELETE /posts/:id', async () => {
    await request(app).delete(`/posts/${postId}`).expect(401);
  });

  // Not Found tests (404 errors)
  it('should return 404 for non-existent post; GET /posts/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app).get(`/posts/${nonExistentId}`).expect(404);
  });

  it('should return 404 for non-existent post; PUT /posts/:id', async () => {
    const nonExistentId = 'non-existent-id';
    const updatedTestPost = {
      title: 'Updated Post',
      shortDescription: 'This post does not exist',
      content: 'Content for non-existent post',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .put(`/posts/${nonExistentId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedTestPost)
      .expect(404);
  });

  it('should return 404 for non-existent post; DELETE /posts/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .delete(`/posts/${nonExistentId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(404);
  });
});
