import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendUser } from './entities/friend-user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { CreateFriendUserDto } from './dto/create-friend-user.dto';
import { FriendStatusInvitation } from './entities/enum/friend-status-invitation.enum';
import { RoomService } from '../room/room.service';
import { NotificationsService } from '../socket/notifications.service';
import { ResponseFriendDto } from './dto/response-friend.dto';

@Injectable()
export class FriendUsersService {
  constructor(
    private usersService: UsersService,

    private notificationsService: NotificationsService,

    @InjectRepository(FriendUser)
    private friendUserRepository: Repository<FriendUser>,

    @Inject(forwardRef(() => RoomService))
    private roomService: RoomService,
  ) {}

  async getFriend(userId: string, friendId: string) {
    const friendRelation: FriendUser = await this.friendUserRepository.findOne({
      where: { user: { id: userId }, friend: { id: friendId } },
      relations: ['user', 'friend'],
    });

    console.log('FRIND RELATION FRIND RELATION');
    console.log(friendRelation);
    return friendRelation;
  }

  async addFriend(userId: string, friendId: string): Promise<FriendUser> {
    const user: ResponseUserDto = await this.usersService.findOne(userId);
    const friend: ResponseUserDto = await this.usersService.findOne(friendId);
    if (!user || !friend) {
      throw new Error('User or friend not found');
    }
    const existingRelation = await this.friendUserRepository.findOne({
      where: { user: user, friend: friend },
    });

    if (existingRelation) {
      throw new Error('Invitation already sent');
    }

    const friendUser: FriendUser = this.friendUserRepository.create({
      user,
      friend,
    });

    return await this.friendUserRepository.save(friendUser);
  }

  async fixturesGeneration(
    createFriendsRealtionDto: CreateFriendUserDto,
  ): Promise<FriendUser> {
    const user: ResponseUserDto = await this.usersService.findOne(
      createFriendsRealtionDto.userId,
    );
    const friend: ResponseUserDto = await this.usersService.findOne(
      createFriendsRealtionDto.friendId,
    );

    if (!user || !friend) {
      throw new Error('User or Friend not found');
    }

    const friendRelation: FriendUser = this.friendUserRepository.create({
      user: user,
      friend: friend,
      status: createFriendsRealtionDto.status,
    });

    return await this.friendUserRepository.save(friendRelation);
  }

  async sendFriendInvitation(
    userId: string,
    friendId: string,
  ): Promise<FriendUser> {
    const user = await this.usersService.findOne(userId);
    const friend = await this.usersService.findOne(friendId);

    if (!user || !friend) {
      throw new Error('User or friend not found');
    }

    const existingRelation = await this.friendUserRepository.findOne({
      where: { user: user, friend: friend },
    });

    if (existingRelation) {
      throw new Error('Invitation already sent');
    }

    const friendUser = this.friendUserRepository.create({
      user,
      friend,
      status: FriendStatusInvitation.PENDING,
    });

    this.notificationsService.sendInvitationNotification(
      `You have a new friend request from ${user.pseudo}`,
    );

    return await this.friendUserRepository.save(friendUser);
  }

  async acceptFriendInvitation(invitationId: string): Promise<FriendUser> {
    const invitation: FriendUser = await this.friendUserRepository.findOne({
      where: { id: invitationId },
      relations: ['user', 'friend'],
    });
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    invitation.status = FriendStatusInvitation.ACCEPTED;
    console.log(invitation);

    //Create room ici
    await this.roomService.create({
      title: `Private room ${invitation.friend.pseudo} and ${invitation.friend.pseudo}`,
      owner: invitation.user,
      participants: [invitation.friend],
      createdAt: new Date(),
    });
    console.log(
      await this.roomService.create({
        title: `Private room ${invitation.user.pseudo} and ${invitation.friend.pseudo}`,
        owner: invitation.user,
        participants: [invitation.friend],
        createdAt: new Date(),
      }),
    );

    return await this.friendUserRepository.save(invitation);
  }

  async rejectFriendInvitation(invitationId: string): Promise<FriendUser> {
    const invitation = await this.friendUserRepository.findOne({
      where: { id: invitationId },
    });
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    invitation.status = FriendStatusInvitation.REJECTED;
    return await this.friendUserRepository.save(invitation);
  }
}
