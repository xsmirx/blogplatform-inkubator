import { Express } from 'express';
import request from 'supertest';

export async function clearDb(app: Express) {
  await request(app).delete(`/testing/all-data`).expect(204);
}
