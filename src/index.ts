import express from 'express';
import { setupApp } from './setup-app';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const host = process.env.HOST;
if (!host) {
  throw new Error('HOST not found');
}

const port = process.env.PORT;
if (!port) {
  throw new Error('PORT not found');
} else if (isNaN(Number(port))) {
  throw new Error('PORT must be a number');
}

const mongoUrl = process.env.MONGO_URL;
if (!mongoUrl) {
  throw new Error('MONGO_URL not found');
}

console.log(`Using MONGO_URL: ${mongoUrl}`);

const app = express();

setupApp(app);

app.listen(Number(port), host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
