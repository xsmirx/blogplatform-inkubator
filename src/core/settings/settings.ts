import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;
if (!HOST) {
  throw new Error('HOST not found');
}

const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT not found');
} else if (isNaN(Number(PORT))) {
  throw new Error('PORT must be a number');
}

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error('MONGO_URL not found');
}

const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
if (!MONGO_DB_NAME) {
  throw new Error('MONGO_DB_NAME not found');
}

export const settings = {
  HOST,
  PORT: Number(PORT),
  MONGO_URL,
  MONGO_DB_NAME,
};
