import dotenv from 'dotenv';

// import type { SignOptions } from 'jsonwebtoken';
import type { Environment, ISettings } from './types';

dotenv.config();

class Settings implements ISettings {
  readonly #environment: Environment | undefined;
  readonly #port: string | undefined;
  readonly #mongoUri: string | undefined;
  // readonly #secretKey: string | undefined;

  constructor(env: NodeJS.ProcessEnv) {
    // console.log('===============config===============')
    this.#environment = env.APP_ENV as Environment | undefined;
    this.#port = env.PORT;
    this.#mongoUri = env.MONGO_URI;
    // this.#secretKey = env.JWT_SECRET;
  }

  get environment(): Environment {
    if (this.#environment === undefined)
      throw new Error('NODE_ENV is undefined');
    return this.#environment;
  }

  get port(): number {
    if (this.#port === undefined) return 0;
    return +this.#port;
  }

  get dbUri(): string {
    if (this.#mongoUri === undefined)
      throw new Error('undefined MONGO_URI in .env');
    return this.#mongoUri;
  }

  // get jwtSecretKey(): string {
  //   if (this.#secretKey === undefined)
  //     throw new Error('undefined JWT_SECRET in .env');
  //   return this.#secretKey;
  // }

  // get jwtSignOptions(): SignOptions {
  //   return {
  //     expiresIn: 3600,
  //   };
  // }
}

export const {
  environment,
  port,
  dbUri,
  // jwtSecretKey,
  // jwtSignOptions,
} = new Settings(process.env);
