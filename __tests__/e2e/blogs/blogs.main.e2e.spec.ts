import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { BlogInputDTO } from '../../../src/blogs/dto/blog.dto';

describe('Blogs API - Main Functionality', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await clearDb(app);
  });

  it('should return []; GET /blogs', async () => {
    await request(app).get('/blogs').expect(200).expect([]);
  });

  const testBlog = {
    name: 'Test Blog',
    description: 'This is a test blog',
    websiteUrl: 'https://testblog.com',
  } satisfies BlogInputDTO;

  let blogId: string | null = null;
  it('should create a new blog; POST /blogs', async () => {
    const response = await request(app)
      .post('/blogs')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testBlog)
      .expect(201);
    blogId = response.body.id;
  });

  it('should return blog; GET /blogs/:id', async () => {
    const response = await request(app).get(`/blogs/${blogId}`).expect(200);
    expect(response.body.id).toEqual(blogId);
    expect(response.body.name).toEqual(testBlog.name);
    expect(response.body.description).toEqual(testBlog.description);
    expect(response.body.websiteUrl).toEqual(testBlog.websiteUrl);
  });

  const updatedTestBlog = {
    name: 'Updated Blog',
    description: 'This is an updated test blog',
    websiteUrl: 'https://updatedtestblog.com',
  } satisfies BlogInputDTO;

  it('should update blog; PUT /blogs/:id', async () => {
    await request(app)
      .put(`/blogs/${blogId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedTestBlog)
      .expect(204);
  });

  it('should delete blog; DELETE /blogs/:id', async () => {
    await request(app)
      .delete(`/blogs/${blogId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(204);
  });
});
