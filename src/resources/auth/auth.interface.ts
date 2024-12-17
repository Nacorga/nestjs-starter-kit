import { User } from '../users/schemas/user.schema';

export interface Auth {
  user: User;
  access_token?: string;
}
