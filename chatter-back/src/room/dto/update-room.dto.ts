import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../message/entities/message.entity';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  id?: string;
  title?: string;
  owner?: User;
  participants?: User[];
  messages?: Message[];
}
