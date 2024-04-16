import { IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

export class LoginResponseDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  access_token: string;
  friends: User[];
}
