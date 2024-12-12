import { DB_CONNECTION } from '@/constants/global.constants';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(process.env.DB_MONGO_URI),
  },
];
