import { prop, getModelForClass } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import type { ITweet } from './Tweet';

class Tweet implements ITweet {
  @prop({ auto: true })
  _id: Types.ObjectId;

  @prop({ required: true, unique: true })
  img: string[];

  @prop({ required: false })
  tweet: string;

  @prop({ required: true })
  authorId: Types.ObjectId;
}

export const TweetsModel = getModelForClass(Tweet);
