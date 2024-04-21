import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFixtures } from '../fixtures/user.fixtures';
import { FriendUsersModule } from '../friend-users/friend-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => FriendUsersModule),
  ],
  controllers: [UsersController],
  providers: [UserFixtures, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
