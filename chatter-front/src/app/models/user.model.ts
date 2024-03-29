import { UserGeneralRoleEnum } from '../enum/user.general.role.enum';

export class UserModel {
  public id!: string;
  public pseudo!: string;
  public firstName?: string;
  public lastName?: string;
  public email!: string;
  public role?: UserGeneralRoleEnum;
}
