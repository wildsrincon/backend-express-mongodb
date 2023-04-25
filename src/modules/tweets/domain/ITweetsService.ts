import type { ITweet} from './Tweet';

export interface FindTweetsParams {
  offset?: number;
  limit?: number;
  authorId?: string;
}

export interface TweetsResponse {
  pagination: { limit: number; offset: number; total: number };
  tweets: ITweet[];
}

export interface ITweetsService {
  getAllTweets: (query: FindTweetsParams) => Promise<TweetsResponse>;
  getOneTweet: (id: string) => Promise<ITweet | null>;
  registerTweet: (tweet: ITweet) => Promise<ITweet>;
  updateTweet: (id: string, tweet: ITweet) => Promise<ITweet | null>;
  deleteTweet: (id: string) => Promise<ITweet | null>;
}
