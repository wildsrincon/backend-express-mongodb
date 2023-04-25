import { z } from 'zod';
import type { AnyZodObject } from 'zod';

export class TweetSchema {
  readonly getAllSchema: AnyZodObject;
  readonly getOneschema: AnyZodObject;
  readonly createSchema: AnyZodObject;
  readonly deleteSchema: AnyZodObject;
  constructor() {
    const id = { length: 24, error: 'id must be a 24 hex characters' };
    const tweet = {
      min: 2,
      max: 140,
      minError: 'Name mus be a minimun 2 characters',
      maxError: 'Name mus be a max 140 characters',
    };
    const image = {
      invalidUrl: 'Invalid url',
    };
    // ----------------------------------------------
    this.getAllSchema = z.object({
      body: z
        .object({
          tweet: z
            .string()
            .min(tweet.min, tweet.minError)
            .max(tweet.max, tweet.maxError)
            .optional(),
          image: z.string().url(image.invalidUrl).startsWith('http://'),
          offset: z.string().min(1).max(2).optional(),
          limit: z.string().min(1).max(2).optional(),
        })
        .strict(),
    });
    // ----------------------------------------------
    this.getOneschema = z.object({
      params: z
        .object({ _id: z.string().length(id.length, id.error) })
        .strict(),
    });
    // ----------------------------------------------
    this.createSchema = z.object({
      body: z
        .object({
          tweet: z
            .string()
            .min(tweet.min, tweet.minError)
            .max(tweet.max, tweet.maxError),
          image: z.string().startsWith('http://'),
          authorId: z.string().length(id.length, id.error),
        })
        .strict(),
    });
    // ----------------------------------------------
    this.deleteSchema = z.object({
      params: z
        .object({ _id: z.string().length(id.length, id.error) })
        .strict(),
    });
  }
}

export const tweetSchema = new TweetSchema();
