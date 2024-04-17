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
import { LoginResponseDto } from './dto/login.response.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserGeneralRoleEnum } from './entities/types/user.general.roles.enum';
import { ValidationErrors } from '../exceptions/ValidationErrors';
import { ChangePasswordDto } from './dto/ChangePasswordDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user: User = await this.usersRepository.findOne({
      where: { email: loginDto.email },
      relations: ['friends'],
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
      friends: user.friends,
    };
  }

  async findOne(id: string): Promise<ResponseUserDto> {
    const test = await this.usersRepository.findOne({
      where: { id },
      relations: ['friends'],
    });
    return test;
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return this.usersRepository.find();
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(
    id: string,
    updateUserDto: Partial<User>,
  ): Promise<ResponseUserDto> {
    const user: User = await this.usersRepository.findOne({ where: { id } });
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

  async getFriends(userId: string): Promise<ResponseUserDto[]> {
    const userFriends: ResponseUserDto[] = await this.usersRepository.find({
      where: { id: userId },
      relations: ['friends'],
    });
    return userFriends;
  }

  async addFriend(userId: string, friend: User | string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    if (friend instanceof User) {
      if (user && !user.friends.some((f) => f.id === friend.id)) {
        user.friends.push(friend);
        await this.usersRepository.save(user);
      }
    } else {
      const friendUser = await this.usersRepository.findOne({
        where: { id: friend },
      });
      if (
        user &&
        friendUser &&
        !user.friends.some((f) => f.id === friendUser.id)
      ) {
        user.friends.push(friendUser);
        await this.usersRepository.save(user);
      }
    }
  }

  async getPasswordInformation(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      select: ['password'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const examplePassword = user.password;
    const passwordForDisplay = `${examplePassword.charAt(0)}${'*'.repeat(examplePassword.length - 1)}`;

    return passwordForDisplay;
  }
}
