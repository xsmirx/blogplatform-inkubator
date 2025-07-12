import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { runDb } from '../../../src/db/mongo.db';
import { BlogInputDTO } from '../../../src/blogs/application/dto/blog.dto';
import { PostInputDTO } from '../../../src/posts/application/dto/post.dto';

describe('Posts API - Main Functionality', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;
  let blogName: string | null = null;

  beforeAll(async () => {
    await runDb('mongodb://admin:admin@localhost:27017', 'blogplatform-dev');
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
    blogName = blogResponse.body.name;
  });

  it('should return []; GET /posts', async () => {
    await request(app)
      .get('/posts')
      .expect(200)
      .expect({
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: [],
      });
  });

  const testPost = {
    title: 'Test Post',
    shortDescription: 'This is a test post',
    content: 'This is the content of the test post',
    blogId: '',
  } satisfies PostInputDTO;

  let postId: string | null = null;
  it('should create a new post; POST /posts', async () => {
    const testPostWithBlogId = { ...testPost, blogId: blogId! };
    const response = await request(app)
      .post('/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
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

  it('should return post; GET /posts/:id', async () => {
    const response = await request(app).get(`/posts/${postId}`).expect(200);
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

  it('should update post; PUT /posts/:id', async () => {
    const testPostWithBlogId = { ...updatedTestPost, blogId: blogId! };
    await request(app)
      .put(`/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testPostWithBlogId)
      .expect(204);

    // Verify the post was updated
    const response = await request(app).get(`/posts/${postId}`).expect(200);
    expect(response.body.title).toBe(updatedTestPost.title);
    expect(response.body.shortDescription).toBe(
      updatedTestPost.shortDescription,
    );
    expect(response.body.content).toBe(updatedTestPost.content);
    expect(response.body.blogId).toBe(blogId);
    expect(response.body.blogName).toBe(blogName);
  });

  it('should delete post; DELETE /posts/:id', async () => {
    await request(app)
      .delete(`/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(204);

    // Verify the post was deleted
    await request(app).get(`/posts/${postId}`).expect(404);
  });
});
