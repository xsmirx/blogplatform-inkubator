import express from 'express';
import { setupApp } from './setup-app';
import { settings } from './core/settings/settings';
import { runDb } from './db/mongo.db';

const bootstrap = async () => {
  const app = express();
  setupApp(app);

  await runDb(settings.MONGO_URL, settings.MONGO_DB_NAME);

  app.listen(Number(settings.PORT), settings.HOST, () => {
    console.log(`[ ready ] http://${settings.HOST}:${settings.PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
