import { IsNotEmpty } from 'class-validator';
import { ResponseUserDto } from './response-user.dto';
import { FriendUser } from '../../friend-users/entities/friend-user.entity';
import { Exclude } from 'class-transformer';

export class LoginResponseDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  pseudo!: string;

  @Exclude()
  password: string;

  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  picture: string | null;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  friendships: FriendUser[];

  @IsNotEmpty()
  friends: ResponseUserDto[];
}
