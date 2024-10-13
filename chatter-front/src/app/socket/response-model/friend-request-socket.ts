export class FriendRequestSocket {
  constructor(
    public senderId: string,
    public senderPicture: string,
    public senderPseudo: string,
    public receiverId: string,
  ) {}
}
