import { ResponseUserDto } from './response-user.dto';

export class GetMeResponseDto extends ResponseUserDto {
  friends: ResponseUserDto[];
}
