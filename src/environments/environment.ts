import * as dotenv from 'dotenv';

dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

export const environment: any = {
    mongodbURI: env.MONGODB_URI
};