import type { ITweet } from '../domain/Tweet';
import type {
  ITweetsService,
  FindTweetsParams,
  TweetsResponse,
} from '../domain/ITweetsService';
import type { TweetsModel } from '../domain/TweetsModel';

interface Dependences {
  model: typeof TweetsModel;
}

export default class MongoTweetsRepository implements ITweetsService {
  readonly #model: typeof TweetsModel;
  constructor({ model }: Dependences) {
    this.#model = model;
  }

  public getAllTweets = async ({
    offset = 1,
    limit = 10,
    authorId,
  }: FindTweetsParams): Promise<TweetsResponse> => {
    if (typeof limit === 'string') limit = +limit;
    if (typeof offset === 'string') offset = +offset;
    let tweets: ITweet[];
    const pagination = { total: 0, offset, limit };
    if (name !== undefined) {
      pagination.total = await this.#model.count({ authorId });
      tweets = await this.#model
        .find({ authorId })
        .limit(limit)
        .skip((offset - 1) * limit);
    } else {
      pagination.total = await this.#model.count();
      tweets = await this.#model
        .find({ authorId })
        .limit(limit)
        .skip((offset - 1) * limit);
    }

    return { tweets, pagination };
  };

  public findTweets = async (query: object): Promise<ITweet[]> => {
    const tweets = await this.#model.find(query);
    return tweets;
  };

  public getOneTweet = async (_id: string): Promise<ITweet | null> => {
    const tweet = await this.#model.findOne({ _id });
    return tweet;
  };

  public registerTweet = async (tweet: ITweet): Promise<ITweet> => {
    const newTweet = new this.#model(tweet);
    return await newTweet.save();
  };

  public updateTweet = async (
    id: string,
    tweet: ITweet
  ): Promise<ITweet | null> => {
    const tweetUpdated = await this.#model.findByIdAndUpdate(id, tweet, {
      new: true,
    });
    return tweetUpdated;
  };

  public deleteTweet = async (_id: string): Promise<ITweet | null> => {
    const tweetDeleted = await this.#model.findByIdAndDelete(_id);
    return tweetDeleted;
  };
}
