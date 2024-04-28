import { Injectable, signal, WritableSignal } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RoomAddFriendService {
  public friendAdded: WritableSignal<UserModel[]> = signal([]);
  constructor() {}
}
