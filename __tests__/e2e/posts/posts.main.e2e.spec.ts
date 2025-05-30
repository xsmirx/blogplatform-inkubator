import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { PostInputDTO } from '../../../src/posts/dto/post.dto';
import { BlogInputDTO } from '../../../src/blogs/dto/blog.dto';

describe('Posts API - Main Functionality', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;
  let blogName: string | null = null;

  beforeAll(async () => {
    await clearDb(app);

    // Create a blog first, since posts need a blogId
    const testBlog = {
      name: 'Test Blog',
      description: 'This is a test blog for posts testing',
      websiteUrl: 'https://testblogforposts.com',
    } satisfies BlogInputDTO;

    const blogResponse = await request(app)
      .post('/api/blogs')
      .set(
        'authorization',
        `Bearer ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testBlog)
      .expect(201);

    blogId = blogResponse.body.id;
    blogName = blogResponse.body.name;
  });

  it('should return []; GET /api/posts', async () => {
    await request(app).get('/api/posts').expect(200).expect([]);
  });

  const testPost = {
    title: 'Test Post',
    shortDescription: 'This is a test post',
    content: 'This is the content of the test post',
    blogId: '',
  } satisfies PostInputDTO;

  let postId: string | null = null;
  it('should create a new post; POST /api/posts', async () => {
    const testPostWithBlogId = { ...testPost, blogId: blogId! };
    const response = await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Bearer ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testPostWithBlogId)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    postId = response.body.id;
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.shortDescription).toBe(testPost.shortDescription);
    expect(response.body.content).toBe(testPost.content);
    expect(response.body.blogId).toBe(blogId);
    expect(response.body.blogName).toBe(blogName);
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
    title: 'Updated Post',
    shortDescription: 'This is an updated test post',
    content: 'This is the updated content of the test post',
    blogId: '',
  } satisfies PostInputDTO;

  it('should update post; PUT /api/posts/:id', async () => {
    const testPostWithBlogId = { ...updatedTestPost, blogId: blogId! };
    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Bearer ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testPostWithBlogId)
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

  it('should delete post; DELETE /api/posts/:id', async () => {
    await request(app)
      .delete(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Bearer ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(204);

    // Verify the post was deleted
    await request(app).get(`/api/posts/${postId}`).expect(404);
  });
});
