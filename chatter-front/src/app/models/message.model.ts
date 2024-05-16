import { RoomModel } from './room.model';
import { UserModel } from './user.model';

export class MessageModel {
  public id!: string;
  public content!: string;
  public createdAt!: Date;
  public sender!: UserModel;
  public isRead!: boolean;
  public roomId!: string;
  public room!: RoomModel;
}
