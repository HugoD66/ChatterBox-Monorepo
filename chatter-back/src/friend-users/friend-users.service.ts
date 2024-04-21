import { Get, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendUser } from './entities/friend-user.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { CreateFriendUserDto } from './dto/create-friend-user.dto';
import { User } from '../users/entities/user.entity';
import { Public } from '../security/auth/public.decorator';

@Injectable()
export class FriendUsersService {
  constructor(
    private usersService: UsersService,

    @InjectRepository(FriendUser)
    private friendUserRepository: Repository<FriendUser>,
  ) {}

  async addFriend(userId: string, friendId: string): Promise<FriendUser> {
    const user: ResponseUserDto = await this.usersService.findOne(userId);
    const friend: ResponseUserDto = await this.usersService.findOne(friendId);
    if (!user || !friend) {
      throw new Error('User or friend not found');
    }
    const friendUser: FriendUser = this.friendUserRepository.create({
      user,
      friend,
    });

    return await this.friendUserRepository.save(friendUser);
  }

  @Get(`/:userId`)
  async getFriends(
    @Param('userId') userId: string,
  ): Promise<ResponseUserDto[]> {
    return this.usersService.getFriends(userId);
  }

  async findAllByUser(user: User): Promise<FriendUser[]> {
    return await this.friendUserRepository.find({ where: { user: user } });
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
    });

    return await this.friendUserRepository.save(friendRelation);
  }
}
