import { IsNotEmpty, IsOptional } from 'class-validator';
import { FriendStatusInvitation } from '../entities/enum/friend-status-invitation.enum';

export class CreateFriendUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  friendId: string;

  @IsOptional()
  createdAt: Date;

  @IsNotEmpty()
  status: FriendStatusInvitation;
}
