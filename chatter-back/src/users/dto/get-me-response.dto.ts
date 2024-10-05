import { ResponseUserDto } from './response-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ResponseFriendDto } from '../../friend-users/dto/response-friend.dto';

export class GetMeResponseDto extends ResponseUserDto {
  @IsNotEmpty()
  access_token?: string;

  @IsNotEmpty()
  friends: ResponseFriendDto[][];
}
