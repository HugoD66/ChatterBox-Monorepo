import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UsersModule } from '../users/users.module';
import { RoomModule } from '../room/room.module';
import { NotificationsGateway } from '../socket/notifications.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UsersModule, RoomModule],
  controllers: [MessageController],
  providers: [MessageService, NotificationsGateway],
  exports: [MessageService],
})
export class MessageModule {}
