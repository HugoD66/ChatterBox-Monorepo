import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { FriendUsersService } from './friend-users.service';
import { Public } from '../security/auth/public.decorator';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '../security/auth/auth.guard';
import { ResponseFriendDto } from './dto/response-friend.dto';
import { FriendUser } from './entities/friend-user.entity';

@Controller('friend-users')
export class FriendUsersController {
  constructor(
    private readonly friendUsersService: FriendUsersService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Get(`/:userId/:friendId`)
  @UseGuards(AuthGuard)
  async getFriend(
    @Param('userId') userId: string,
    @Param('friendId') friendId: string,
  ): Promise<FriendUser> {
    console.log('userId', userId, 'friendId', friendId);
    return this.friendUsersService.getFriend(userId, friendId);
  }

  @Public()
  @Get(`/friends/:userId`)
  async getFriends(
    @Param('userId') userId: string,
  ): Promise<ResponseFriendDto[][]> {
    return this.usersService.getFriends(userId);
  }

  @UseGuards(AuthGuard)
  @Get(`/friends/accepted/:userId`)
  async getAcceptedFriends(
    @Param('userId') userId: string,
  ): Promise<ResponseFriendDto[]> {
    return this.usersService.getAcceptedFriends(userId);
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
  @Post('/delete-friend')
  async deleteFriend(@Body() body: { userId: string; friendId: string }) {
    return await this.friendUsersService.removeInvitation(
      body.userId,
      body.friendId,
    );
  }

  @UseGuards(AuthGuard)
  @Patch('/accept-invitation/:friendRelationId')
  async acceptInvitation(@Param('friendRelationId') friendRelationId: string) {
    return await this.friendUsersService.acceptFriendInvitation(
      friendRelationId,
    );
  }

  @UseGuards(AuthGuard)
  @Post('/reject-invitation/:invitationId')
  async rejectInvitation(@Param('invitationId') invitationId: string) {
    return await this.friendUsersService.rejectFriendInvitation(invitationId);
  }
}
