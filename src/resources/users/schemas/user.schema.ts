import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { USER_LOGIN_TYPES } from '../user.constants';
import { UserLoginType } from '../user.types';

export type UserDoc = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  uuid: string;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  email: string;

  @Prop({ type: SchemaTypes.String, required: true, select: false })
  password: string;

  @Prop({ type: SchemaTypes.String, required: true })
  lang: string;

  @Prop({ type: SchemaTypes.String, enum: USER_LOGIN_TYPES })
  loginType?: UserLoginType;

  @Prop({ type: SchemaTypes.String })
  img?: string;

  @Prop({ type: SchemaTypes.String })
  name?: string;

  @Prop({ type: SchemaTypes.String, default: 'free' })
  plan: string;

  @Prop({ type: SchemaTypes.Boolean, default: false })
  isVerified: boolean;

  @Prop({ type: SchemaTypes.Boolean, default: true })
  newsletter: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
