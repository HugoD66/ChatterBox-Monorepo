import { forwardRef, Module } from '@nestjs/common';
import { FriendUsersService } from './friend-users.service';
import { FriendUsersController } from './friend-users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { FriendUser } from './entities/friend-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendUser]),
    forwardRef(() => UsersModule),
  ],
  controllers: [FriendUsersController],
  providers: [FriendUsersService],
  exports: [FriendUsersService],
})
export class FriendUsersModule {}
