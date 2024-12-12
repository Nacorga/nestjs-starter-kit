import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '@/database/database.module';
import { userProviders } from './user.providers';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UsersModule {}
