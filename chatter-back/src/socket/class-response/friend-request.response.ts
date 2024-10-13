export class FriendRequestResponse {
  constructor(
    public senderId: string,
    public senderPicture: string,
    public senderPseudo: string,
    public receiverId: string,
  ) {}
}
