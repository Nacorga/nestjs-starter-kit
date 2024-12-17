import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '@/database/database.module';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { UtilsModule } from '@/lib/utils/utils.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule, UtilsModule],
  providers: [ConfigService, UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
