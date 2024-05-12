import { UserGeneralRoleEnum } from '../enum/user.general.role.enum';
import { FriendRelationModel } from './friend-relation.model';

export class UserModel {
  public id!: string;
  public pseudo!: string;
  public email!: string;
  public picture?: string;
  public createdAt!: Date;
  public roleGeneral!: UserGeneralRoleEnum;
  public friendships?: FriendRelationModel[];
}

export interface GetMeModel extends UserModel {
  access_token: string;
  friends: UserModel[];
}
