import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;
if (!HOST) {
  throw new Error('HOST not found');
}

const PORT = process.env.PORT;
if (!PORT || isNaN(Number(PORT))) {
  throw new Error('PORT not found');
}

const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  throw new Error('MONGO_URL not found');
}

const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
if (!MONGO_DB_NAME) {
  throw new Error('MONGO_DB_NAME not found');
}

export const AC_SECRET = process.env.AC_SECRET;
if (!AC_SECRET) {
  throw new Error('AC_SECRET not found');
} 

export const AC_TIME = process.env.AC_TIME;
if (!AC_TIME || isNaN(Number(AC_TIME))) {
  throw new Error('AC_TIME not found or invalid');
}

export const settings = {
  HOST,
  PORT: Number(PORT),
  MONGO_URL,
  MONGO_DB_NAME,
  AC_SECRET,
  AC_TIME: Number(AC_TIME),
};
