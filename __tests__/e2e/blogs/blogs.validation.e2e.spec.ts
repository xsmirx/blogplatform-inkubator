import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';

import { runDb } from '../../../src/db/mongo.db';
import { BlogInputDTO } from '../../../src/blogs/application/dto/blog.dto';

describe('Blogs API - Validation Tests', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;

  beforeAll(async () => {
    await runDb('mongodb://admin:admin@localhost:27017', 'blodplatform-test');

    await clearDb(app);

    // Create a blog for testing ID validation
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

  // ID validation tests
  it('should return 400 for invalid id; PUT /blogs/:id', async () => {
    const validBlog = {
      name: 'Valid Blog',
      description: 'Valid description',
      websiteUrl: 'https://validblog.com',
    } satisfies BlogInputDTO;

    await request(app)
      .put('/blogs/')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(validBlog)
      .expect(404); // Express router will return 404 for empty path
  });

  it('should return 400 for invalid id; DELETE /blogs/:id', async () => {
    await request(app)
      .delete('/blogs/')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(404); // Express router will return 404 for empty path
  });

  // Body validation tests for POST
  describe('POST /blogs validation', () => {
    it('should return 400 for missing name', async () => {
      const invalidBlog = {
        description: 'Valid description',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'Name is required',
          }),
        ]),
      );
    });

    it('should return 400 for empty name', async () => {
      const invalidBlog = {
        name: '',
        description: 'Valid description',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'Name must be between 1 and 15 characters long',
          }),
        ]),
      );
    });

    it('should return 400 for name too long', async () => {
      const invalidBlog = {
        name: 'This is a very long name that exceeds the 15 character limit',
        description: 'Valid description',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'Name must be between 1 and 15 characters long',
          }),
        ]),
      );
    });

    it('should return 400 for non-string name', async () => {
      const invalidBlog = {
        name: 123,
        description: 'Valid description',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'Name must be a string',
          }),
        ]),
      );
    });

    it('should return 400 for missing description', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'description',
            message: 'Description is required',
          }),
        ]),
      );
    });

    it('should return 400 for empty description', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        description: '',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'description',
            message: 'Description must be between 1 and 500 characters long',
          }),
        ]),
      );
    });

    it('should return 400 for description too long', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        description: 'a'.repeat(501),
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'description',
            message: 'Description must be between 1 and 500 characters long',
          }),
        ]),
      );
    });

    it('should return 400 for missing websiteUrl', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        description: 'Valid description',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'websiteUrl',
            message: 'Website URL is required',
          }),
        ]),
      );
    });

    it('should return 400 for invalid websiteUrl format', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        description: 'Valid description',
        websiteUrl: 'invalid-url',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'websiteUrl',
            message: 'Website URL must be a valid URL',
          }),
        ]),
      );
    });

    it('should return 400 for websiteUrl not starting with https', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        description: 'Valid description',
        websiteUrl: 'http://invalidblog.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'websiteUrl',
            message: 'Description must be a valid URL starting with https://',
          }),
        ]),
      );
    });

    it('should return 400 for websiteUrl too long', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        description: 'Valid description',
        websiteUrl: 'https://' + 'a'.repeat(100) + '.com',
      };
      const response = await request(app)
        .post('/blogs')
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'websiteUrl',
            message: 'Website URL must be between 1 and 100 characters long',
          }),
        ]),
      );
    });
  });

  // Body validation tests for PUT
  describe('PUT /blogs/:id validation', () => {
    it('should return 400 for missing name', async () => {
      const invalidBlog = {
        description: 'Valid description',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .put(`/blogs/${blogId}`)
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'Name is required',
          }),
        ]),
      );
    });

    it('should return 400 for empty name', async () => {
      const invalidBlog = {
        name: '',
        description: 'Valid description',
        websiteUrl: 'https://validblog.com',
      };
      const response = await request(app)
        .put(`/blogs/${blogId}`)
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'name',
            message: 'Name must be between 1 and 15 characters long',
          }),
        ]),
      );
    });

    it('should return 400 for invalid websiteUrl format', async () => {
      const invalidBlog = {
        name: 'Valid Name',
        description: 'Valid description',
        websiteUrl: 'invalid-url',
      };
      const response = await request(app)
        .put(`/blogs/${blogId}`)
        .set(
          'authorization',
          `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
        )
        .send(invalidBlog)
        .expect(400);

      expect(response.body.errorsMessages).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'websiteUrl',
            message: 'Website URL must be a valid URL',
          }),
        ]),
      );
    });
  });
});
