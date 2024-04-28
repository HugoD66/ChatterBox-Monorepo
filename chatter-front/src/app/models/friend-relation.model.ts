import { UserModel } from './user.model';

export class FriendRelationModel {
  public createdAt!: string;
  public friend!: UserModel;
  public id!: string;
}
