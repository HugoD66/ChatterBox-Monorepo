import { Injectable } from '@nestjs/common';
import { FriendUsersService } from '../friend-users/friend-users.service';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { CreateFriendUserDto } from '../friend-users/dto/create-friend-user.dto';

@Injectable()
export class FriendFixtures {
  constructor(
    private friendUsersService: FriendUsersService,
    private readonly usersService: UsersService,
  ) {}

  async seedFriends(): Promise<void> {
    const userList: ResponseUserDto[] = await this.usersService.findAll();
    const friendList: CreateFriendUserDto[] = [
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        createdAt: new Date(),
      },
    ];
    for (const friend of friendList) {
      await this.friendUsersService.fixturesGeneration(friend);
    }
  }
}
