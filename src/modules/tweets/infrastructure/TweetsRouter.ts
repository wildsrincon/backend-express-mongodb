import type { Router, RequestHandler } from 'express';
import type { AnyZodObject } from 'zod';
import type { TweetSchema } from '../application/TweetSchema';
import type TweetsController from './TweetsController';

interface Dependences {
  router: Router;
  controller: TweetsController;
  schemaValidator: (arg: AnyZodObject) => RequestHandler;
  schemas: TweetSchema;
}
export default class TweetsRouter {
  readonly #router: Router;
  constructor({
    router,
    controller,
    schemaValidator,
    schemas,
  }: Dependences) {
    this.#router = router;

    const {
      getTweet,
      getTweets,
      postTweet,
      putTweet,
      deleteTweet,
    } = controller;

    const {
      getAllSchema,
      getOneschema,
      createSchema,
      deleteSchema,
    } = schemas;

    this.#router.get('/tweets/all', schemaValidator(getAllSchema), getTweets); // TODO cache
    this.#router.get(
      '/tweets/:_id',
      schemaValidator(getOneschema),
      getTweet
    ); // TODO cache

    this.#router.post('/tweet', schemaValidator(createSchema), postTweet);
    this.#router.put('/tweets/:_id', putTweet);
    this.#router.delete(
      '/tweets/:_id',
      schemaValidator(deleteSchema),
      deleteTweet
    );
  }

  get router(): Router {
    return this.#router;
  }
}
