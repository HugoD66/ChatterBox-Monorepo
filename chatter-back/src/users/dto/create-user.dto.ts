import {
  IsNotEmpty,
  MinLength,
  IsStrongPassword,
  IsEmail,
} from 'class-validator';
import { UserGeneralRoleEnum } from '../entities/types/user.general.roles.enum';
import { ValidationErrors } from '../../exceptions/ValidationErrors';
import { User } from '../entities/user.entity';
export class CreateUserDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED_FIELD })
  @MinLength(3, { message: ValidationErrors.PSEUDO_LENGTH })
  public pseudo!: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED_FIELD })
  @IsEmail({}, { message: ValidationErrors.EMAIL_INVALID })
  public email!: string;

  public roleGeneral?: UserGeneralRoleEnum;

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
  @IsNotEmpty({ message: ValidationErrors.REQUIRED_FIELD })
  public password!: string;

  picture?: string;

  public friends?: User[];
}
