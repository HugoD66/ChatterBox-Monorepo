import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFixtures } from '../fixtures/user.fixtures';
import { FriendUsersModule } from '../friend-users/friend-users.module';
import { NotificationsModule } from '../socket/notification.module';
import { NotificationsGateway } from '../socket/notifications.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => FriendUsersModule),
    NotificationsModule,
  ],
  controllers: [UsersController],
  providers: [UserFixtures, UsersService, NotificationsGateway],
  exports: [UsersService],
})
export class UsersModule {}
