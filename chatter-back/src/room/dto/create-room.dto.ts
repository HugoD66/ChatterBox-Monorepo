import { ValidationErrors } from '../../exceptions/ValidationErrors';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

export class CreateRoomDto {
  @IsNotEmpty({ message: ValidationErrors.REQUIRED_FIELD })
  @MinLength(3, { message: ValidationErrors.MIN_LENGTH })
  public title!: string;

  @IsNotEmpty({ message: ValidationErrors.REQUIRED_FIELD })
  public owner!: ResponseUserDto;

  @IsNotEmpty({ message: ValidationErrors.PARTICIPANTS_REQUIRED })
  public participants!: ResponseUserDto[];

  @IsOptional()
  createdAt: Date;
}
