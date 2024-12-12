import { Connection } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { DB_CONNECTION } from '@/constants/global.constants';
import { MODEL } from '@/constants/model.constants';

export const userProviders = [
  {
    provide: MODEL.USER,
    useFactory: (connection: Connection) => connection.model(User.name, UserSchema),
    inject: [DB_CONNECTION],
  },
];
