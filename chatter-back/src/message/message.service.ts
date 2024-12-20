import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessageDto } from './dto/response-message.dto';
import { RoomService } from '../room/room.service';
import { NotificationsGateway } from '../socket/notifications.gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

    private readonly notificationsGateway: NotificationsGateway,

    private roomService: RoomService,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const room = await this.roomService.findOne(createMessageDto.roomId);

    if (!room) {
      throw new Error('Room not found');
    }

    createMessageDto.room = room;

    const messageInsered = await this.messageRepository.save(createMessageDto);

    this.notificationsGateway.emitRefreshDiscussion(
      'New message',
      messageInsered,
    );

    return messageInsered;
  }

  async findOne(id: string): Promise<ResponseMessageDto> {
    return await this.messageRepository.findOne({ where: { id } });
  }

  async findByRoom(roomId: string): Promise<ResponseMessageDto[]> {
    return await this.messageRepository.find({
      where: { room: { id: roomId } },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });
  }

  async findAll(): Promise<ResponseMessageDto[]> {
    return await this.messageRepository.find();
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

  async removeAll(): Promise<void> {
    await this.messageRepository.delete({});
  }
}
