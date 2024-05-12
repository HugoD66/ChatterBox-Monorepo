export class MessageModel {
  public id!: string;
  public content!: string;
  public createdAt!: Date;
  public senderId!: string;
  public isRead!: boolean;
}
