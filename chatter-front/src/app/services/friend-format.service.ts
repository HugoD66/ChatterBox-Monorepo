import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { FriendModel } from '../models/friend-relation.model';
import { FriendStatusInvitation } from '../models/enums/friend-status-invitation.enum';

@Injectable()
export class FriendFormatservice {
  constructor() {
    effect(() => {}, { allowSignalWrites: true });
  }

  public getAllFriends(friends: FriendModel[][]): FriendModel[] {
    if (!friends || !Array.isArray(friends)) {
      console.warn('Friends data is undefined or not an array');
      return [];
    }
    const completeList: FriendModel[] = [];
    friends.forEach((friendCase) => {
      friendCase.forEach((friend) => {
        completeList.push(friend);
      });
    });
    return completeList;
  }

  public countFriends(friends: FriendModel[][]): number {
    return this.getFriendListAccepted(friends).length;
  }

  public getFriendListAccepted(
    friendListAccepted: FriendModel[][],
  ): FriendModel[] {
    const friendFlat = this.getAllFriends(friendListAccepted);
    return friendFlat.filter(
      (friend) => friend.status === FriendStatusInvitation.ACCEPTED,
    );
  }

  public getFriendListPending() {
    // return this.friendListPending();
  }

  public getFriendListRejected() {
    // return this.friendListRejected();
  }
}
