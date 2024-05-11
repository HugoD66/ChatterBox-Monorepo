import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { MessageModule } from '../../message/message.module';
import { UsersModule } from '../../users/users.module';
import { MessageFixtures } from '../message.fixtures';
import { UserFixtures } from '../user.fixtures';
import { FriendFixtures } from '../friend.fixtures';
import { FriendUsersModule } from '../../friend-users/friend-users.module';
import { RoomFixtures } from '../room.fixtures';
import { RoomModule } from '../../room/room.module';

@Module({
  imports: [UsersModule, MessageModule, FriendUsersModule, RoomModule],
  controllers: [FixtureController],
  providers: [
    FixtureService,
    UserFixtures,
    MessageFixtures,
    FriendFixtures,
    RoomFixtures,
  ],
  exports: [FixtureService],
})
export class FixtureModule {}
