import { ResponseUserDto } from './response-user.dto';
import { IsNotEmpty } from 'class-validator';

export class GetMeResponseDto extends ResponseUserDto {
  @IsNotEmpty()
  access_token: string;

  @IsNotEmpty()
  friends: ResponseUserDto[];

  @IsNotEmpty()
  pendingInvitations: ResponseUserDto[];
}
