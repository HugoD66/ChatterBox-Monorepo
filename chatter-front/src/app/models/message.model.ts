import { RoomModel } from './room.model';
import { UserModel } from './user.model';

export class MessageModel {
  public content!: string;
  public createdAt!: Date;
  public sender!: UserModel;
  public isRead!: boolean;
  public roomId!: string;
  public room!: RoomModel;
  public id?: string;

  constructor(
    content: string,
    createdAt: Date,
    sender: UserModel,
    roomId: string,
    isRead: boolean,
  ) {
    this.content = content;
    this.createdAt = createdAt;
    this.sender = sender;
    this.roomId = roomId;
    this.isRead = isRead;
  }
}
