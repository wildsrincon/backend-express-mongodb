import Express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import Server from './Server';
import { dbUri, environment, port } from './Settings';
import Mongo from './MongoRepository';
import modules from '../modules';

import type { RequestHandler } from 'express';

const mongoRepository = new Mongo(mongoose, dbUri, environment);
const middlewares: RequestHandler[] = [
  environment === 'dev' ? morgan('dev') : morgan('common'),
  json(),
  cors(),
];
export const server = new Server({
  app: Express(),
  environment,
  port,
  db: mongoRepository,
  middlewares,
  modules,
});
