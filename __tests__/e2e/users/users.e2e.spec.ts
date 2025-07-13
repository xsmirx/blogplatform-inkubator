import express from 'express';
import request from 'supertest';
import { runDb } from '../../../src/db/mongo.db';
import { clearDb } from '../utils/clear-db';
import { setupApp } from '../../../src/setup-app';
import { getNewUser } from '../utils/getNewUser';

describe('Users API - Main Functionality', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await runDb('mongodb://admin:admin@localhost:27017', 'blogplatform-test');
    await clearDb(app);
  });

  it('shold return []; GET /users', async () => {
    await request(app)
      .get('/users')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(200)
      .expect({
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: [],
      });
  });

  const newUser = getNewUser();
  let newUserId: string | null = null;
  let newUserCreatedAt: string | null = null;

  it('should create a new user; POST /users', async () => {
    const responce = await request(app)
      .post('/users')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(newUser)
      .expect(201);
    expect(responce.body).toEqual({
      id: expect.any(String),
      login: newUser.login,
      email: newUser.email,
      createdAt: expect.any(String),
    });
    newUserId = responce.body.id;
    newUserCreatedAt = responce.body.createdAt;
  });

  it('should return array of users; GET /users', async () => {
    const response = await request(app)
      .get('/users')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(200);

    expect(response.body).toEqual({
      pagesCount: 1,
      page: 1,
      pageSize: 10,
      totalCount: 1,
      items: [
        {
          id: newUserId,
          login: newUser.login,
          email: newUser.email,
          createdAt: newUserCreatedAt,
        },
      ],
    });
  });

  it('should delete user; DELETE /users/:id', async () => {
    await request(app)
      .delete(`/users/${newUserId}`)
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(204);
  });

  it('should return [] after delet users; GET /users', async () => {
    await request(app)
      .get('/users')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(200)
      .expect({
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: [],
      });
  });
});
