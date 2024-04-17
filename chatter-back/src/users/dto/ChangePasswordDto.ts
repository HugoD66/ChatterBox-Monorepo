import { IsNotEmpty, IsStrongPassword, MinLength } from 'class-validator';

export class ChangePasswordDto {
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
