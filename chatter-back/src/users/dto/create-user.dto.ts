import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { UserRoleEnum } from '../entities/types/user.roles.enum';

export class CreateUserDto {
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  public pseudo!: string;

  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  public role?: UserRoleEnum;

  @MinLength(3)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: `Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial`,
    },
  )
  @IsNotEmpty({ message: `Le mot de passe ne peut pas être vide` })
  public password!: string;
}
