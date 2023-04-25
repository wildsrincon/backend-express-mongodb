import { Router } from 'express';
import { httpResponse } from '../shared/HttpResponse';
import { schemaValidator } from '../shared/SchemaValidatorMiddleware';
// infrastructure
import TweetsRouter from './infrastructure/TweetsRouter';
import TweetsController from './infrastructure/TweetsController';
import TweetsService from './application/MongoTweetsRepository';
// application
import { tweetSchema as schemas } from './application/TweetSchema';
// domain
import { TweetsModel } from './domain/TweetsModel';

const service = new TweetsService({ model: TweetsModel });
const controller = new TweetsController({ httpResponse, service });

export default new TweetsRouter({
  router: Router(),
  controller,
  schemaValidator,
  schemas,
}).router;
