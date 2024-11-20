import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendUser } from './entities/friend-user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { CreateFriendUserDto } from './dto/create-friend-user.dto';
import { FriendStatusInvitation } from './entities/enum/friend-status-invitation.enum';
import { RoomService } from '../room/room.service';
import { NotificationsGateway } from '../socket/notifications.gateway';
import { FriendResponse } from '../socket/class-response/friend.response';
import { FriendRequestResponse } from '../socket/class-response/friend-request.response';

@Injectable()
export class FriendUsersService {
  constructor(
    private usersService: UsersService,

    private readonly notificationsGateway: NotificationsGateway,

    @InjectRepository(FriendUser)
    private friendUserRepository: Repository<FriendUser>,

    @Inject(forwardRef(() => RoomService))
    private roomService: RoomService,
  ) {}

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

    //Verification si deja room crée entre les deux.
    const isRoomExist = await this.roomService.getRoomByUser({
      userId: user.id,
      participantId: friend.id,
    });

    if (!isRoomExist) {
      await this.roomService.create({
        title: `Private room (Fixture generation) ${user.pseudo} and ${friend.pseudo}`,
        owner: user,
        participants: [friend],
        createdAt: new Date(),
      });
    }

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

    const friendSocketInvitation: FriendRequestResponse =
      new FriendRequestResponse(
        user.id,
        user.picture,
        user.pseudo,
        friendUser.friend.id,
      );

    this.notificationsGateway.emitFriendInvitation(
      `Message Socket: Friend invitation from ${user.pseudo} to ${friend.pseudo}`,
      friendSocketInvitation,
    );

    return await this.friendUserRepository.save(friendUser);
  }

  async getFriend(userId: string, friendId: string) {
    return await this.friendUserRepository.findOne({
      where: [
        { user: { id: userId }, friend: { id: friendId } },
        { user: { id: friendId }, friend: { id: userId } },
      ],
    });
  }

  async removeInvitation(userId: string, friendId: string): Promise<void> {
    const existingRelation = await this.getFriend(userId, friendId);

    if (!existingRelation) {
      throw new NotFoundException('No friend found');
    }

    await this.friendUserRepository.remove(existingRelation);
  }

  async acceptFriendInvitation(friendRelationId: string) {
    const invitation: FriendUser = await this.friendUserRepository.findOne({
      where: { id: friendRelationId },
      relations: ['user', 'friend'],
    });

    if (!invitation) {
      throw new Error('Invitation not found');
    }

    invitation.status = FriendStatusInvitation.ACCEPTED;

    const existingRoom = await this.roomService.getRoomByUser({
      userId: invitation.user.id,
      participantId: invitation.friend.id,
    });

    if (!existingRoom) {
      await this.roomService.create({
        title: `Private room ${invitation.user.pseudo} and ${invitation.friend.pseudo}`,
        owner: invitation.user,
        participants: [invitation.friend],
        createdAt: new Date(),
      });
    }

    const acceptedFriendInvitation: FriendResponse = new FriendResponse(
      invitation.user.id,
      invitation.friend.id,
      invitation.user.pseudo,
      invitation.friend.pseudo,
      new Date(),
    );

    this.notificationsGateway.emitAcceptedFriendInvitation(
      `Message Socket: ${invitation.user.pseudo} and ${invitation.friend.pseudo} are now friends`,
      acceptedFriendInvitation,
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
