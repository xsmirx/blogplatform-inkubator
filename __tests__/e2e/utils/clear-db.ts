import { Express } from 'express';
import request from 'supertest';

export async function clearDb(app: Express) {
  await request(app).delete(`/apitesting/all-data`).expect(204);
}
