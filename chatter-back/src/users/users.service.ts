import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserGeneralRoleEnum } from './entities/types/user.general.roles.enum';
import { ValidationErrors } from '../exceptions/ValidationErrors';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { GetMeResponseDto } from './dto/get-me-response.dto';
import { FriendUser } from '../friend-users/entities/friend-user.entity';
import { FriendStatusInvitation } from '../friend-users/entities/enum/friend-status-invitation.enum';
import { ResponseFriendDto } from '../friend-users/dto/response-friend.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(FriendUser)
    private friendUsersRespository: Repository<FriendUser>,
  ) {}
  //Fixtures
  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Email déjà pris.');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    const user: User = this.usersRepository.create({
      pseudo: createUserDto.pseudo,
      email: createUserDto.email,
      password: hashedPassword,
      picture: createUserDto.picture ?? null,
      roleGeneral: createUserDto.roleGeneral ?? UserGeneralRoleEnum.Utilisateur,
    });
    const savedUser: User = await this.usersRepository.save(user);
    return savedUser;
  }

  async register(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: createUserDto.email }, { pseudo: createUserDto.pseudo }],
    });
    if (existingUser) {
      throw new BadRequestException("Email ou Nom d'utilisateur déjà pris.");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user: User = this.usersRepository.create({
      pseudo: createUserDto.pseudo,
      email: createUserDto.email,
      password: hashedPassword,
      roleGeneral: createUserDto.roleGeneral ?? UserGeneralRoleEnum.Utilisateur,
    });
    const savedUser: User = await this.usersRepository.save(user);
    return savedUser;
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    userId: string,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(changePasswordDto.password, salt);
    return !!(await this.usersRepository.update(user.id, {
      password: hashedPassword,
    }));
  }

  async login(loginDto: LoginDto): Promise<GetMeResponseDto> {
    const user: User = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new NotFoundException(ValidationErrors.USER_NOT_FOUND);
    }
    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException(ValidationErrors.CREDENTIALS_INVALID);
    }
    const payload = { sub: user.id, email: user.email };
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
      friends: await this.getFriends(user.id),
    };
  }

  async getMe(userId: string): Promise<GetMeResponseDto> {
    const user: User = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['friendships', 'friendships.friend'],
    });
    const payload = { sub: user.id, email: user.email };
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
      friends: await this.getFriends(user.id),
    };
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['friendships'],
    });
  }

  async findOneByOptions(options: Partial<User>): Promise<User> {
    return await this.usersRepository.findOne({
      where: options,
      relations: ['friendships', 'friendships.friend'],
    });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return await this.usersRepository.find();
  }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async update(
    id: string,
    updateUserDto: Partial<User>,
  ): Promise<ResponseUserDto> {
    const user: User = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = {
      ...user,
      ...updateUserDto,
    };
    await this.usersRepository.save(updatedUser);
    return {
      id: updatedUser.id,
      pseudo: updatedUser.pseudo,
      email: updatedUser.email,
      picture: updatedUser.picture,
      createdAt: updatedUser.createdAt,
      roleGeneral: updatedUser.roleGeneral,
    };
  }

  async getPicture(userId: string): Promise<string> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.picture;
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  async removeAll(): Promise<void> {
    await this.usersRepository.delete({});
  }

  async getFriends(userId: string): Promise<ResponseFriendDto[][]> {
    const friendListAccepted: FriendUser[] =
      await this.friendUsersRespository.find({
        where: [
          { user: { id: userId }, status: FriendStatusInvitation.ACCEPTED },
          { friend: { id: userId }, status: FriendStatusInvitation.ACCEPTED },
        ],
        relations: ['friend', 'user'],
      });

    const friendListAcceptedFiltered = friendListAccepted
      .map((friendship) => {
        if (friendship.user.id === userId) {
          return { ...friendship, friendRelation: friendship.friend };
        }
        return { ...friendship, friendRelation: friendship.user };
      })
      .map((friendship) => {
        delete friendship.user;
        delete friendship.friend;
        return friendship;
      });

    //Pending
    const friendListPending: FriendUser[] =
      await this.friendUsersRespository.find({
        where: [
          { user: { id: userId }, status: FriendStatusInvitation.PENDING },
          { friend: { id: userId }, status: FriendStatusInvitation.PENDING },
        ],
        relations: ['friend', 'user'],
      });
    const friendListPendingFiltered = friendListPending
      .map((friendship) => {
        if (friendship.user.id === userId) {
          return { ...friendship, isSendingByMe: true };
        }
        return { ...friendship, isSendingByMe: false };
      })
      .map((friendship) => {
        if (friendship.user.id === userId) {
          return { ...friendship, friendRelation: friendship.friend };
        }
        return { ...friendship, friendRelation: friendship.user };
      })
      .map((friendship) => {
        delete friendship.user;
        delete friendship.friend;
        return friendship;
      });

    //Rejected
    const friendListRejected: FriendUser[] =
      await this.friendUsersRespository.find({
        where: [
          { user: { id: userId }, status: FriendStatusInvitation.REJECTED },
          { friend: { id: userId }, status: FriendStatusInvitation.REJECTED },
        ],
        relations: ['friend', 'user'],
      });

    const friendListRejectedFiltered = friendListRejected
      .map((friendship) => {
        if (friendship.user.id === userId) {
          return { ...friendship, friendRelation: friendship.friend };
        }
        return { ...friendship, friendRelation: friendship.user };
      })
      .map((friendship) => {
        delete friendship.user;
        delete friendship.friend;
        return friendship;
      });

    return [
      friendListAcceptedFiltered,
      friendListPendingFiltered,
      friendListRejectedFiltered,
    ];
  }
}
