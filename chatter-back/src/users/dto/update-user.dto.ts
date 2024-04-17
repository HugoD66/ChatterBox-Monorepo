import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';
import { UserGeneralRoleEnum } from '../entities/types/user.general.roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  public email: string;
  public pseudo: string;
  public password: string;
  public roleGeneral?: UserGeneralRoleEnum;
  public picture: string;
  public friends?: User[];
}
