import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { PostInputDTO } from '../../../src/posts/dto/post.dto';
import { BlogInputDTO } from '../../../src/blogs/dto/blog.dto';

describe('Posts API', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;
  let blogName: string | null = null;

  beforeAll(async () => {
    await clearDb(app);

    // Create a blog first, since posts need a blogId
    const testBlog = {
      name: 'Test Blog for Posts',
      description: 'This is a test blog for posts testing',
      websiteUrl: 'https://testblogforposts.com',
    } satisfies BlogInputDTO;

    const blogResponse = await request(app)
      .post('/api/blogs')
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testBlog)
      .expect(201);

    blogId = blogResponse.body.id;
    blogName = blogResponse.body.blogName;
  });

  it('should return []; GET /api/posts', async () => {
    await request(app).get('/api/posts').expect(200).expect([]);
  });

  const testPost = {
    title: 'Test Post',
    shortDescription: 'This is a test post',
    content: 'This is the content of the test post',
    blogId: '', // Will be set dynamically
  } satisfies PostInputDTO;
  it('should return 401 for unauthorized user; POST /api/posts', async () => {
    const postWithBlogId = { ...testPost, blogId: blogId! };
    await request(app).post('/api/posts').send(postWithBlogId).expect(401);
  });

  it('should return 400 for invalid blogId; POST /api/posts', async () => {
    const postWithInvalidBlogId = { ...testPost, blogId: 'invalid-blog-id' };
    await request(app)
      .post('/api/posts')
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithInvalidBlogId)
      .expect(400);
  });

  let postId: string | null = null;
  it('should create a new post; POST /api/posts', async () => {
    const postWithBlogId = { ...testPost, blogId: blogId! };
    const response = await request(app)
      .post('/api/posts')
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithBlogId)
      .expect(201);

    postId = response.body.id;
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.shortDescription).toBe(testPost.shortDescription);
    expect(response.body.content).toBe(testPost.content);
    expect(response.body.blogId).toBe(blogId);
    expect(response.body.blogName).toBeDefined();
  });

  it('should return 404 for non-existent post; GET /api/posts/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .get(`/api/posts/${nonExistentId}`)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(404);
  });

  it('should return post; GET /api/posts/:id', async () => {
    const response = await request(app).get(`/api/posts/${postId}`).expect(200);
    expect(response.body.id).toBe(postId);
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.shortDescription).toBe(testPost.shortDescription);
    expect(response.body.content).toBe(testPost.content);
    expect(response.body.blogId).toBe(blogId);
    expect(response.body.blogName).toBe(blogName);
  });

  const updatedTestPost = {
    title: 'Updated Test Post',
    shortDescription: 'This is an updated test post',
    content: 'This is the updated content of the test post',
    blogId: '', // Will be set dynamically
  } satisfies PostInputDTO;

  it('should return 401 for unauthorized user; PUT /api/posts/:id', async () => {
    const updatedPostWithBlogId = { ...updatedTestPost, blogId: blogId! };
    await request(app)
      .put(`/api/posts/${postId}`)
      .send(updatedPostWithBlogId)
      .expect(401);
  });

  it('should return 404 for non-existent post; PUT /api/posts/:id', async () => {
    const nonExistentId = 'non-existent-id';
    const updatedPostWithBlogId = { ...updatedTestPost, blogId: blogId! };
    await request(app)
      .put(`/api/posts/${nonExistentId}`)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithBlogId)
      .expect(404);
  });

  it('should return 400 for invalid blogId; PUT /api/posts/:id', async () => {
    const updatedPostWithInvalidBlogId = {
      ...updatedTestPost,
      blogId: 'invalid-blog-id',
    };
    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithInvalidBlogId)
      .expect(400);
  });

  it('should update post; PUT /api/posts/:id', async () => {
    const updatedPostWithBlogId = { ...updatedTestPost, blogId: blogId! };
    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithBlogId)
      .expect(204);

    // Verify the post was updated
    const response = await request(app).get(`/api/posts/${postId}`).expect(200);
    expect(response.body.title).toBe(updatedTestPost.title);
    expect(response.body.shortDescription).toBe(
      updatedTestPost.shortDescription,
    );
    expect(response.body.content).toBe(updatedTestPost.content);
    expect(response.body.blogId).toBe(blogId);
    expect(response.body.blogName).toBe(blogName);
  });

  it('should return 401 for unauthorized user; DELETE /api/posts/:id', async () => {
    await request(app).delete(`/api/posts/${postId}`).expect(401);
  });

  it('should return 404 for non-existent post; DELETE /api/posts/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .delete(`/api/posts/${nonExistentId}`)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(404);
  });

  it('should delete post; DELETE /api/posts/:id', async () => {
    await request(app)
      .delete(`/api/posts/${postId}`)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(204);

    // Verify the post was deleted
    await request(app).get(`/api/posts/${postId}`).expect(404);
  });
});
