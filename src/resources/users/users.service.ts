import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { MODEL } from '@/constants/model.constants';

@Injectable()
export class UsersService {
  constructor(@Inject(MODEL.USER) private userModel: Model<UserDocument>) {}

  async createUser(email: string, password: string): Promise<User> {
    const userExists = await this.userModel.findOne({ email });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: passwordHash });

    return newUser.save();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
