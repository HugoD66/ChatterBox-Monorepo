import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessageDto } from './dto/response-message.dto';
import { UsersService } from '../users/users.service';
import { ResponseUserDto } from '../users/dto/response-user.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

    private usersSerivce: UsersService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    console.log(createMessageDto);
    return await this.messageRepository.save(createMessageDto);
  }
  /*async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const sender: ResponseUserDto = await this.usersSerivce.findOne(
      createMessageDto.senderId,
    );
    const receiver: ResponseUserDto = await this.usersSerivce.findOne(
      createMessageDto.receiverId,
    );
    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }
    const message = this.messageRepository.create({
      ...createMessageDto,
      sender: sender,
      receiver: receiver,
    });

    return await this.messageRepository.save(message);
  }*/

  async findOne(id: string): Promise<ResponseMessageDto> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ResponseMessageDto[]> {
    return await this.messageRepository.find();
  }

  /*async findDiscussion(
    friendId: string,
    userId: string,
  ): Promise<ResponseMessageDto[]> {
    const partOne = await this.messageRepository.find({
      where: {
        sender: { id: friendId },
        receiver: { id: userId },
      },
      relations: ['sender', 'receiver'],
    });
    const partTwo = await this.messageRepository.find({
      where: {
        sender: { id: userId },
        receiver: { id: friendId },
      },
      relations: ['sender', 'receiver'],
    });
    return [...partOne, ...partTwo].sort((a, b) => {
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
  }

  async findAllUnreads(receiverId: string): Promise<ResponseMessageDto[]> {
    return await this.messageRepository.find({
      where: {
        receiver: { id: receiverId },
        isRead: false,
      },
      relations: ['sender', 'receiver'],
    });
  }*/

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<ResponseMessageDto> {
    await this.messageRepository.update(id, updateMessageDto);
    return await this.messageRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }

  async removeAll(): Promise<void> {
    await this.messageRepository.delete({});
  }
}
