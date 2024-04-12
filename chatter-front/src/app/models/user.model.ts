import { UserGeneralRoleEnum } from '../enum/user.general.role.enum';

export class UserModel {
  public id!: string;
  public pseudo!: string;
  public email!: string;

  public picture?: string;
  public createdAt!: Date;
  public generalRoleEnum!: UserGeneralRoleEnum;
}
