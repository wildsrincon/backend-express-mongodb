import { Response, Request } from 'express';
import type { IHttpResponse } from '../../shared/types';
import type { ITweetsService } from '../domain/ITweetsService';

interface Dependences {
  httpResponse: IHttpResponse;
  service: ITweetsService;
}

export default class TweetsController {
  #response: IHttpResponse;
  #service: ITweetsService;
  constructor({ httpResponse, service }: Dependences) {
    this.#response = httpResponse;
    this.#service = service;
  }

  public getTweet = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const tweet = await this.#service.getOneTweet(_id);
      if (tweet === null)
        return this.#response.notFound(res, `not found tweet with id: ${_id}`);
      return this.#response.ok(res, tweet);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public getTweets = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { tweets, pagination } = await this.#service.getAllTweets(
        req.query
      );
      if (tweets === null) return this.#response.notFound(res);
      return this.#response.ok(res, tweets, pagination);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public postTweet = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tweetRegistered = await this.#service.registerTweet(req.body);
      return this.#response.ok(res, tweetRegistered);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public putTweet = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = req.params;
    try {
      const tweetUpdated = await this.#service.updateTweet(_id, req.body);
      if (tweetUpdated === null)
        return this.#response.notFound(res, `not found movie with id: ${_id}`);
      return this.#response.ok(res, tweetUpdated);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };

  public deleteTweet = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { _id } = req.params;
    try {
      const tweetDeleted = await this.#service.deleteTweet(_id);
      if (tweetDeleted === null)
        return this.#response.notFound(res, `not found movie with id: ${_id}`);
      return res.sendStatus(204);
    } catch (error) {
      return this.#response.error(res, error);
    }
  };
}
