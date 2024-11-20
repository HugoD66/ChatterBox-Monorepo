import { UserModel } from './user.model';
import { MessageModel } from './message.model';

export class RoomModel {
  public id!: string;
  public title!: string;
  public owner!: UserModel;
  public participants!: UserModel[];
  public messages!: MessageModel[];
  constructor(
    id: string,
    title: string,
    owner: UserModel,
    participants: UserModel[],
    messages: MessageModel[],
  ) {
    this.id = id;
    this.title = title;
    this.owner = owner;
    this.participants = participants;
    this.messages = messages;
  }
}
