import { Express } from 'express';

export const setupApp = (app: Express) => {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello API' });
  });
};
