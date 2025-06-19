import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { runDb } from '../../../src/db/mongo.db';
import { BlogInputDTO } from '../../../src/blogs/application/dto/blog.dto';

describe('Blogs API - Authorization and Not Found Errors', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;

  beforeAll(async () => {
    await runDb('mongodb://admin:admin@localhost:27017', 'blodplatform-test');

    await clearDb(app);

    // Create a blog for testing authorization and 404 errors
    const testBlog = {
      name: 'Test Blog',
      description: 'This is a test blog',
      websiteUrl: 'https://testblog.com',
    } satisfies BlogInputDTO;

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

  // Authorization tests (401 errors)
  it('should return 401 for unauthorized user; POST /blogs', async () => {
    const testBlog = {
      name: 'Test Blog',
      description: 'This is a test blog',
      websiteUrl: 'https://testblog.com',
    } satisfies BlogInputDTO;
    await request(app).post('/blogs').send(testBlog).expect(401);
  });

  it('should return 401 for unauthorized user; PUT /blogs/:id', async () => {
    const updatedTestBlog = {
      name: 'Updated Blog',
      description: 'This is an updated test blog',
      websiteUrl: 'https://updatedtestblog.com',
    } satisfies BlogInputDTO;
    await request(app)
      .put(`/blogs/${blogId}`)
      .send(updatedTestBlog)
      .expect(401);
  });

  it('should return 401 for unauthorized user; DELETE /blogs/:id', async () => {
    await request(app).delete(`/blogs/${blogId}`).expect(401);
  });

  // Not Found tests (404 errors)
  it('should return 404 for non-existent blog; GET /blogs/:id', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011'; // valid but non-existent MongoDB ObjectId
    await request(app).get(`/blogs/${nonExistentId}`).expect(404);
  });

  it('should return 404 for non-existent blog; PUT /blogs/:id', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';
    const updatedTestBlog = {
      name: 'Updated Blog',
      description: 'This is an updated test blog',
      websiteUrl: 'https://updatedtestblog.com',
    } satisfies BlogInputDTO;
    await request(app)
      .put(`/blogs/${nonExistentId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedTestBlog)
      .expect(404);
  });

  it('should return 404 for non-existent blog; DELETE /blogs/:id', async () => {
    const nonExistentId = '507f1f77bcf86cd799439011';
    await request(app)
      .delete(`/blogs/${nonExistentId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(404);
  });
});
