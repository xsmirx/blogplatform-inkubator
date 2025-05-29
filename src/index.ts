import express from 'express';
import { setupApp } from './setup-app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

setupApp(app);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
