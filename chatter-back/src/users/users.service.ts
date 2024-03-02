import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ResponseUserDto} from './dto/response-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {EmailAlreadyExistsException} from "../exceptions/EmailAlreadyExistsException";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }
  async register(createUserDto: CreateUserDto): Promise <ResponseUserDto> {
    const isEmailFree: number = await this.usersRepository.count({ where: { email: createUserDto.email } });
    if (isEmailFree > 0) {
      throw new EmailAlreadyExistsException();
    }
    return this.usersRepository.create(createUserDto);
  }



  async findOne(id: string): Promise<ResponseUserDto> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ResponseUserDto[]> {
    return this.usersRepository.find();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto> {
    const user: User = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = {
      ...user,
      ...updateUserDto,
    };
    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
