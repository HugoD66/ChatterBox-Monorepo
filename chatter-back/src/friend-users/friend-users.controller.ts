import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FriendUsersService } from './friend-users.service';
import { Public } from '../security/auth/public.decorator';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { UsersService } from '../users/users.service';

@Controller('friend-users')
export class FriendUsersController {
  constructor(
    private readonly friendUsersService: FriendUsersService,
    private usersService: UsersService,
  ) {}

  @Public() //TODO TEMP
  @Post(`/add-friend/:userId/:friendId`)
  async addFriend(@Body() body: { userId: string; friendId: string }) {
    return this.friendUsersService.addFriend(body.userId, body.friendId);
  }

  @Public()
  @Get(`/friends/:userId`)
  async getFriends(
    @Param('userId') userId: string,
  ): Promise<ResponseUserDto[]> {
    return this.usersService.getFriends(userId);
  }
}
