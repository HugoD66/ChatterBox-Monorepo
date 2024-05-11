import { Injectable } from '@nestjs/common';
import { UserFixtures } from '../user.fixtures';
import { MessageFixtures } from '../message.fixtures';
import { UsersService } from '../../users/users.service';
import { FriendFixtures } from '../friend.fixtures';
import { RoomFixtures } from '../room.fixtures';

@Injectable()
export class FixtureService {
  constructor(
    private readonly userFixtures: UserFixtures,
    private readonly messageFixtures: MessageFixtures,
    private readonly friendFixtures: FriendFixtures,
    private readonly roomFixtures: RoomFixtures,
    private usersService: UsersService,
  ) {}

  async seedUsers(): Promise<string> {
    await this.userFixtures.seedUsers();
    return 'Users fixtures generated';
  }

  async seedRoom(): Promise<string> {
    await this.roomFixtures.seedRooms();
    return 'Room fixtures generated';
  }

  async seedMessages(): Promise<string> {
    await this.messageFixtures.seedMessages();
    return 'Messages fixtures generated';
  }

  async seedFriends(): Promise<string> {
    await this.friendFixtures.seedFriends();
    return 'Friends fixtures generated';
  }

  async deleteAll(): Promise<string> {
    await this.usersService.removeAll();
    console.log('All users and user relations deleted');
    return 'All fixtures deleted';
  }
}
