import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { Room } from '../../room/entities/room.entity';

export class ResponseMessageDto {
  id: string;
  content: string;
  createdAt: Date;
  sender: ResponseUserDto;
  room: Room;
  isRead: boolean;
}
