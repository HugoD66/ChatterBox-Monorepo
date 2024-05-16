import { forwardRef, Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { UsersModule } from '../users/users.module';
import { FriendUsersModule } from '../friend-users/friend-users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    forwardRef(() => FriendUsersModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
