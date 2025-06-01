import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { BlogInputDTO } from '../../../src/blogs/dto/blog.dto';

describe('Blogs API - Authorization and Not Found Errors', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;

  beforeAll(async () => {
    await clearDb(app);

    // Create a blog for testing authorization and 404 errors
    const testBlog = {
      name: 'Test Blog',
      description: 'This is a test blog',
      websiteUrl: 'https://testblog.com',
    } satisfies BlogInputDTO;

    const response = await request(app)
      .post('/api/blogs')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testBlog)
      .expect(201);
    blogId = response.body.id;
  });

  // Authorization tests (401 errors)
  it('should return 401 for unauthorized user; POST /api/blogs', async () => {
    const testBlog = {
      name: 'Test Blog',
      description: 'This is a test blog',
      websiteUrl: 'https://testblog.com',
    } satisfies BlogInputDTO;
    await request(app).post('/api/blogs').send(testBlog).expect(401);
  });

  it('should return 401 for unauthorized user; PUT /api/blogs/:id', async () => {
    const updatedTestBlog = {
      name: 'Updated Blog',
      description: 'This is an updated test blog',
      websiteUrl: 'https://updatedtestblog.com',
    } satisfies BlogInputDTO;
    await request(app)
      .put(`/api/blogs/${blogId}`)
      .send(updatedTestBlog)
      .expect(401);
  });

  it('should return 401 for unauthorized user; DELETE /api/blogs/:id', async () => {
    await request(app).delete(`/api/blogs/${blogId}`).expect(401);
  });

  // Not Found tests (404 errors)
  it('should return 404 for non-existent blog; GET /api/blogs/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app).get(`/api/blogs/${nonExistentId}`).expect(404);
  });

  it('should return 404 for non-existent blog; PUT /api/blogs/:id', async () => {
    const nonExistentId = 'non-existent-id';
    const updatedTestBlog = {
      name: 'Updated Blog',
      description: 'This is an updated test blog',
      websiteUrl: 'https://updatedtestblog.com',
    } satisfies BlogInputDTO;
    await request(app)
      .put(`/api/blogs/${nonExistentId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedTestBlog)
      .expect(404);
  });

  it('should return 404 for non-existent blog; DELETE /api/blogs/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .delete(`/api/blogs/${nonExistentId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(404);
  });
});
