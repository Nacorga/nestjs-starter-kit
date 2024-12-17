import { Langs } from '@/constants/lang.constants';
import { Lang } from '@/types/lang.types';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserGoogleDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsString()
  @IsIn(Langs)
  lang: Lang;
}
