export class FriendResponse {
  constructor(
    public senderId: string,
    public receiverId: string,
    public userPseudo: string,
    public friendPseudo: string,
    public createdAt: Date,
  ) {}
}
