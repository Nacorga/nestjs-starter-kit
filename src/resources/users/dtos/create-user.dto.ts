import { Langs } from '@/constants/lang.constants';
import { Lang } from '@/types/lang.types';
import { IsEmail, IsIn, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/\d/)
  @Matches(/[A-Z]/)
  @Matches(/[a-z]/)
  @Matches(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
  password: string;

  @IsString()
  @IsIn(Langs)
  lang: Lang;
}
