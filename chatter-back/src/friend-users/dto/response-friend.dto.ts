import { ResponseUserDto } from '../../users/dto/response-user.dto';

export class ResponseFriendDto {
  id: string;
  createdAt: Date;
  user: ResponseUserDto;
  friend: ResponseUserDto;
}
