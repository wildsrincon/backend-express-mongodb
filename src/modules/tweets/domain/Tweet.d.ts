import type { Types } from 'mongoose';

export interface ITweet {
  _id: Types.ObjectId;
  img: string[];
  tweet: string;
  authorId: Types.ObjectId;
}
