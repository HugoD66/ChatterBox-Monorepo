import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { FriendUsersService } from './friend-users.service';
import { Public } from '../security/auth/public.decorator';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../security/auth/auth.guard';

@Controller('friend-users')
export class FriendUsersController {
  constructor(
    private readonly friendUsersService: FriendUsersService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Get(`/friends/:userId`)
  async getFriends(
    @Param('userId') userId: string,
  ): Promise<ResponseUserDto[]> {
    return this.usersService.getFriends(userId);
  }

  //TODO CHOISIR ADDFRUIEND OU SENDINVITATION
  @Public()
  @Post(`/add-friend/:userId/:friendId`)
  async addFriend(@Body() body: { userId: string; friendId: string }) {
    return this.friendUsersService.addFriend(body.userId, body.friendId);
  }
  @UseGuards(AuthGuard)
  @Post('/send-invitation')
  async sendInvitation(@Body() body: { userId: string; friendId: string }) {
    return await this.friendUsersService.sendFriendInvitation(
      body.userId,
      body.friendId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('/accept-invitation/:invitationId')
  async acceptInvitation(@Param('invitationId') invitationId: string) {
    return await this.friendUsersService.acceptFriendInvitation(invitationId);
  }

  @UseGuards(AuthGuard)
  @Post('/reject-invitation/:invitationId')
  async rejectInvitation(@Param('invitationId') invitationId: string) {
    return await this.friendUsersService.rejectFriendInvitation(invitationId);
  }
}
