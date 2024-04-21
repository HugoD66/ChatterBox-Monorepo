import { IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';
import { ResponseUserDto } from './response-user.dto';

export class LoginResponseDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  access_token: string;
  friends: ResponseUserDto[];
}
