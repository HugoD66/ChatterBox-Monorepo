import { UserModel } from './user.model';
import { FriendStatusInvitation } from './enums/friend-status-invitation.enum';

export class FriendRelationModel {
  public createdAt!: Date;
  public friend!: UserModel;
  public id!: string;
  public status!: FriendStatusInvitation;
}

export class FriendModel {
  createdAt!: Date;
  id!: string;
  status!: FriendStatusInvitation;
  friendRelation!: UserModel;
}
