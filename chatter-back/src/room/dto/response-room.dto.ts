import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { Message } from '../../message/entities/message.entity';

export class ResponseRoomDto {
  id: string;
  title: string;
  owner: ResponseUserDto;
  participants: ResponseUserDto[];
  messages: Message[];
  createdAt: Date;
}
