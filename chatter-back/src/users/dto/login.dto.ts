import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  @Exclude()
  public password: string;
}
