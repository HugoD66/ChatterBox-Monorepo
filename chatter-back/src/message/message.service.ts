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
  }

  async findOne(id: string): Promise<ResponseMessageDto> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ResponseMessageDto[]> {
    return await this.messageRepository.find();
  }

  async findAllUnreads(): Promise<ResponseMessageDto[]> {
    return await this.messageRepository.find({
      where: { isRead: false },
    });
  }

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
}
