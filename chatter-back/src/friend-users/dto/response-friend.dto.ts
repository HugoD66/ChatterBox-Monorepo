import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { FriendStatusInvitation } from '../entities/enum/friend-status-invitation.enum';

export class ResponseFriendDto {
  id: string;
  createdAt: Date;
  user: ResponseUserDto;
  friend: ResponseUserDto;
  status: FriendStatusInvitation;
}
