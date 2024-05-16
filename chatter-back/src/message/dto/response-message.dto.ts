import { ResponseUserDto } from '../../users/dto/response-user.dto';

export class ResponseMessageDto {
  id: string;
  content: string;
  createdAt: Date;
  sender: ResponseUserDto;
  roomId?: string;
  isRead: boolean;
}
