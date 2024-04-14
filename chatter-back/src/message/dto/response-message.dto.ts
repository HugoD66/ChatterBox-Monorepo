import { ResponseUserDto } from '../../users/dto/response-user.dto';

export class ResponseMessageDto {
  id: string;
  content: string;
  createdAt: Date;
  sender: ResponseUserDto;
  receiver: ResponseUserDto;
  isRead: boolean;
}
