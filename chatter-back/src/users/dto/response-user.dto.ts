import { FriendUser } from '../../friend-users/entities/friend-user.entity';

export class ResponseUserDto {
  id: string;
  pseudo: string;
  email: string;
  roleGeneral: string;
  picture?: string;
  createdAt: Date;
  friendships: FriendUser[];
}
