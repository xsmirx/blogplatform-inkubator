import express from 'express';
import request from 'supertest';
import { runDb } from '../../../src/db/mongo.db';
import { clearDb } from '../utils/clear-db';
import { setupApp } from '../../../src/setup-app';
import { getNewUser } from '../utils/getNewUser';
import { AuthInputDto } from '../../../src/auth/types/auth.input-dto';

describe('Auth API - Main Functionality', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await runDb('mongodb://admin:admin@localhost:27017', 'blogplatform-test');
    await clearDb(app);
  });

  const newUser = getNewUser();

  it('should return 204 for successful login; POST /auth/login', async () => {
    await request(app)
      .post('/users')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(newUser)
      .expect(201);

    const paypoad: AuthInputDto = {
      loginOrEmail: newUser.login,
      password: newUser.password,
    };

    await request(app).post('/auth/login').send(paypoad).expect(204);
  });
});
