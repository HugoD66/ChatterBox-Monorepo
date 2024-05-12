import { UserModel } from './user.model';
import { MessageModel } from './message.model';

export class RoomModel {
  public id!: string;
  public title!: string;
  public owner!: UserModel;
  public participants!: UserModel[];
  public messages!: MessageModel[];
}
