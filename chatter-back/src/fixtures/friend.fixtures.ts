import { Injectable } from '@nestjs/common';
import { FriendUsersService } from '../friend-users/friend-users.service';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { CreateFriendUserDto } from '../friend-users/dto/create-friend-user.dto';
import { FriendStatusInvitation } from '../friend-users/entities/enum/friend-status-invitation.enum';

@Injectable()
export class FriendFixtures {
  constructor(
    private friendUsersService: FriendUsersService,
    private readonly usersService: UsersService,
  ) {}

  async seedFriends(): Promise<void> {
    const userList: ResponseUserDto[] = await this.usersService.findAll();
    const userSenderFriendTest = await this.usersService.findOneByOptions({
      email: `dessauw.hugo@gmail.com`,
    });
    const userReceiverFriendTest = await this.usersService.findOneByOptions({
      email: `sender-test@email.com`,
    });
    const friendList: CreateFriendUserDto[] = [
      {
        userId: userSenderFriendTest.id,
        friendId: userReceiverFriendTest.id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.PENDING,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.PENDING,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.PENDING,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.REJECTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.REJECTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.REJECTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.PENDING,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.PENDING,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.PENDING,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.REJECTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.REJECTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.REJECTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.REJECTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
      {
        userId: userList[Math.floor(Math.random() * userList.length)].id,
        friendId: userList[Math.floor(Math.random() * userList.length)].id,
        status: FriendStatusInvitation.ACCEPTED,
        createdAt: new Date(),
      },
    ];
    for (const friend of friendList) {
      await this.friendUsersService.fixturesGeneration(friend);
    }
  }
}
