import express from 'express';
import request from 'supertest';
import { setupApp } from '../../../src/setup-app';
import { clearDb } from '../utils/clear-db';
import { PostInputDTO } from '../../../src/posts/dto/post.dto';
import { BlogInputDTO } from '../../../src/blogs/dto/blog.dto';

describe('Posts API - Validation Tests', () => {
  const app = express();
  setupApp(app);

  let blogId: string | null = null;
  let postId: string | null = null;

  beforeAll(async () => {
    await clearDb(app);

    // Create a blog first, since posts need a blogId
    const testBlog = {
      name: 'Test Blog',
      description: 'This is a test blog for posts validation testing',
      websiteUrl: 'https://testblogvalidation.com',
    } satisfies BlogInputDTO;

    const blogResponse = await request(app)
      .post('/api/blogs')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testBlog)
      .expect(201);

    blogId = blogResponse.body.id;

    // Create a post for testing ID validation
    const testPost = {
      title: 'Test Post',
      shortDescription: 'This is a test post for validation testing',
      content: 'This is the content of the test post for validation testing',
      blogId: blogId!,
    } satisfies PostInputDTO;

    const postResponse = await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(testPost)
      .expect(201);

    postId = postResponse.body.id;
  });

  // BlogId validation tests
  it('should return 400 for invalid blogId; POST /api/posts', async () => {
    const postWithInvalidBlogId = {
      title: 'Test Post with Invalid BlogId',
      shortDescription: 'This post has invalid blogId',
      content: 'Content with invalid blogId',
      blogId: 'invalid-blog-id',
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithInvalidBlogId)
      .expect(400);
  });

  it('should return 400 for invalid blogId; PUT /api/posts/:id', async () => {
    const updatedPostWithInvalidBlogId = {
      title: 'Updated Post with Invalid BlogId',
      shortDescription: 'This updated post has invalid blogId',
      content: 'Updated content with invalid blogId',
      blogId: 'invalid-blog-id',
    } satisfies PostInputDTO;

    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithInvalidBlogId)
      .expect(400);
  });

  // Title validation tests
  it('should return 400 for missing title; POST /api/posts', async () => {
    const postWithoutTitle = {
      shortDescription: 'This post has no title',
      content: 'Content without title',
      blogId: blogId!,
    };

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithoutTitle)
      .expect(400);
  });

  it('should return 400 for empty title; POST /api/posts', async () => {
    const postWithEmptyTitle = {
      title: '',
      shortDescription: 'This post has empty title',
      content: 'Content with empty title',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithEmptyTitle)
      .expect(400);
  });

  it('should return 400 for too long title; POST /api/posts', async () => {
    const postWithLongTitle = {
      title: 'a'.repeat(31), // Assuming max length is 30
      shortDescription: 'This post has too long title',
      content: 'Content with long title',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithLongTitle)
      .expect(400);
  });

  // Short description validation tests
  it('should return 400 for missing shortDescription; POST /api/posts', async () => {
    const postWithoutShortDescription = {
      title: 'Post without short description',
      content: 'Content without short description',
      blogId: blogId!,
    };

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithoutShortDescription)
      .expect(400);
  });

  it('should return 400 for empty shortDescription; POST /api/posts', async () => {
    const postWithEmptyShortDescription = {
      title: 'Post with empty short description',
      shortDescription: '',
      content: 'Content with empty short description',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithEmptyShortDescription)
      .expect(400);
  });

  it('should return 400 for too long shortDescription; POST /api/posts', async () => {
    const postWithLongShortDescription = {
      title: 'Post with long short description',
      shortDescription: 'a'.repeat(101), // Assuming max length is 100
      content: 'Content with long short description',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithLongShortDescription)
      .expect(400);
  });

  // Content validation tests
  it('should return 400 for missing content; POST /api/posts', async () => {
    const postWithoutContent = {
      title: 'Post without content',
      shortDescription: 'This post has no content',
      blogId: blogId!,
    };

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithoutContent)
      .expect(400);
  });

  it('should return 400 for empty content; POST /api/posts', async () => {
    const postWithEmptyContent = {
      title: 'Post with empty content',
      shortDescription: 'This post has empty content',
      content: '',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithEmptyContent)
      .expect(400);
  });

  it('should return 400 for too long content; POST /api/posts', async () => {
    const postWithLongContent = {
      title: 'Post with long content',
      shortDescription: 'This post has too long content',
      content: 'a'.repeat(1001), // Assuming max length is 1000
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithLongContent)
      .expect(400);
  });

  // BlogId validation tests
  it('should return 400 for missing blogId; POST /api/posts', async () => {
    const postWithoutBlogId = {
      title: 'Post without blogId',
      shortDescription: 'This post has no blogId',
      content: 'Content without blogId',
    };

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithoutBlogId)
      .expect(400);
  });

  it('should return 400 for empty blogId; POST /api/posts', async () => {
    const postWithEmptyBlogId = {
      title: 'Post with empty blogId',
      shortDescription: 'This post has empty blogId',
      content: 'Content with empty blogId',
      blogId: '',
    } satisfies PostInputDTO;

    await request(app)
      .post('/api/posts')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(postWithEmptyBlogId)
      .expect(400);
  });

  // PUT validation tests (same validation rules should apply)
  it('should return 400 for missing title; PUT /api/posts/:id', async () => {
    const updatedPostWithoutTitle = {
      shortDescription: 'Updated post has no title',
      content: 'Updated content without title',
      blogId: blogId!,
    };

    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithoutTitle)
      .expect(400);
  });

  it('should return 400 for empty title; PUT /api/posts/:id', async () => {
    const updatedPostWithEmptyTitle = {
      title: '',
      shortDescription: 'Updated post has empty title',
      content: 'Updated content with empty title',
      blogId: blogId!,
    } satisfies PostInputDTO;

    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithEmptyTitle)
      .expect(400);
  });

  it('should return 400 for missing shortDescription; PUT /api/posts/:id', async () => {
    const updatedPostWithoutShortDescription = {
      title: 'Updated post without short description',
      content: 'Updated content without short description',
      blogId: blogId!,
    };

    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithoutShortDescription)
      .expect(400);
  });

  it('should return 400 for missing content; PUT /api/posts/:id', async () => {
    const updatedPostWithoutContent = {
      title: 'Updated post without content',
      shortDescription: 'Updated post has no content',
      blogId: blogId!,
    };

    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithoutContent)
      .expect(400);
  });

  it('should return 400 for missing blogId; PUT /api/posts/:id', async () => {
    const updatedPostWithoutBlogId = {
      title: 'Updated post without blogId',
      shortDescription: 'Updated post has no blogId',
      content: 'Updated content without blogId',
    };

    await request(app)
      .put(`/api/posts/${postId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(updatedPostWithoutBlogId)
      .expect(400);
  });
});
