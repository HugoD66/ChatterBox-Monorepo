import { ResponseUserDto } from './response-user.dto';

export class GetMeResponseDto extends ResponseUserDto {
  access_token: string;
  friends: ResponseUserDto[];
}
