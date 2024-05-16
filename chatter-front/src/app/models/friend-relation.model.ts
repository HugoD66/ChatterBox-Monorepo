import { UserModel } from './user.model';
import { FriendStatusInvitation } from './enums/friend-status-invitation.enum';

export class FriendRelationModel {
  public createdAt!: string;
  public friend!: UserModel;
  public id!: string;
  public status!: FriendStatusInvitation;
}
