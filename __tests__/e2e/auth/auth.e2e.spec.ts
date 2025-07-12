import express from 'express';
import { runDb } from '../../../src/db/mongo.db';
import { clearDb } from '../utils/clear-db';
import { setupApp } from '../../../src/setup-app';

describe('Auth API - Main Functionality', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await runDb('mongodb://admin:admin@localhost:27017', 'blogplatform-test');
    await clearDb(app);
  });
});
