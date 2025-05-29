import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { BlogInputDTO } from '../../../src/blogs/types/blog.dto';

describe('Blogs API', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await clearDb(app);
  });

  it('shold return []; GET /api/blogs', async () => {
    await request(app).get('/api/blogs').expect(200).expect([]);
  });

  const testBlog = {
    name: 'Test Blog',
    description: 'This is a test blog',
    websiteUrl: 'https://testblog.com',
  } satisfies BlogInputDTO;
  it('should return 401 for unauthorized user; POST /api/blogs', async () => {
    await request(app).post('/api/blogs').send(testBlog).expect(401);
  });

  let blogId: string | null = null;
  it('shold create a new blog; POST /api/blogs', async () => {
    const response = await request(app)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .post('/api/blogs')
      .send(testBlog)
      .expect(201);
    blogId = response.body.id;
  });

  it('should return 404 for non-existent blog; GET /api/blogs/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .get(`/api/blogs/${nonExistentId}`)
      .expect(404);
  });
  it('should return blog; GET /api/blogs/:id', async () => {
    const response = await request(app).get(`/api/blogs/${blogId}`).expect(200);
    expect(response.body.id).toBe(blogId);
    expect(response.body.name).toBe(testBlog.name);
    expect(response.body.description).toBe(testBlog.description);
    expect(response.body.websiteUrl).toBe(testBlog.websiteUrl);
  });

  const updatedTestBlog = {
    name: 'Test Blog',
    description: 'This is a test blog',
    websiteUrl: 'https://testblog.com',
  } satisfies BlogInputDTO;
  it('should return 401 for unauthorized user; PUT /api/blogs/:id', async () => {
    await request(app)
      .put(`/api/blogs/${blogId}`)
      .send(updatedTestBlog)
      .expect(401);
  });
  it('should return 404 for non-existent blog; PUT /api/blogs/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .put(`/api/blogs/${nonExistentId}`)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedTestBlog)
      .expect(404);
  });
  it('should update blog; PUT /api/blogs/:id', async () => {
    await request(app)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .put(`/api/blogs/${blogId}`)
      .send(updatedTestBlog)
      .expect(204);
  });

  it('should return 401 for unauthorized user; DELETE /api/blogs/:id', async () => {
    await request(app).delete(`/api/blogs/${blogId}`).expect(401);
  });
  it('should return 404 for non-existent blog; DELETE /api/blogs/:id', async () => {
    const nonExistentId = 'non-existent-id';
    await request(app)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .delete(`/api/blogs/${nonExistentId}`)
      .expect(404);
  });
  it('should delete blog; DELETE /api/blogs/:id', async () => {
    await request(app)
      .set(
        'Authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .delete(`/api/blogs/${blogId}`);
  });
});
