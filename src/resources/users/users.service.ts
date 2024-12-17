import { Injectable, ConflictException, NotFoundException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User, UserDoc } from './schemas/user.schema';
import { MODEL } from '@/constants/model.constants';
import { UtilsService } from '@/lib/utils/utils.service';
import { ConfigService } from '@nestjs/config';
import { ENV, ENV_NAME } from '@/constants/env.constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MODEL.USER) private userModel: Model<UserDoc>,
    private readonly config: ConfigService,
    private readonly utilsSrv: UtilsService,
  ) {}

  async createUser(data: Partial<User>): Promise<UserDoc> {
    const userExists = await this.userModel.findOne({ email: data.email });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const passHash = await this.generatePasswordHash(data.password || this.utilsSrv.genRandomString(8));

    const newUser = await new this.userModel({
      ...data,
      uuid: uuidv4(),
      password: passHash,
    }).save();

    if (this.config.get<ENV_NAME>(ENV.NODE_ENV) === ENV_NAME.PRODUCTION) {
      // await this.mailingSrv.addContact(newUser.email);
      // await this.sendWelcomeEmail(newUser.email, dto.lang);
    }

    return newUser.save();
  }

  async findById(id: string): Promise<UserDoc> {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findByEmail(email: string): Promise<UserDoc> {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  private async generatePasswordHash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
