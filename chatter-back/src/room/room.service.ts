import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { ResponseRoomDto } from './dto/response-room.dto';
import { ResponseMessageDto } from '../message/dto/response-message.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const roomCreated = this.roomRepository.create(createRoomDto);
    return await this.roomRepository.save(roomCreated);
  }

  async findOne(id: string): Promise<ResponseRoomDto> {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ['messages', 'messages.sender', 'owner', 'participants'],
    });
  }

  async findAll(): Promise<ResponseRoomDto[]> {
    return await this.roomRepository.find({
      relations: ['messages', 'messages.sender', 'owner', 'participants'],
    });
  }

  async findAllUnreadMessages(userId: string): Promise<ResponseMessageDto[]> {
    const rooms = await this.roomRepository.find({
      where: { participants: { id: userId }, owner: { id: userId } },
      relations: ['messages'],
    });
    const messages = rooms.map((room) => room.messages).flat();
    return messages.filter((message) => !message.isRead);
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<ResponseRoomDto> {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new Error('Room not found');
    }
    const updatedRoom = this.roomRepository.merge(room, updateRoomDto);
    await this.roomRepository.save(updatedRoom);
    return updatedRoom;
  }

  async findOneByOptions(options: Partial<Room>): Promise<Room> {
    return await this.roomRepository.findOne({
      where: options,
    });
  }
  async remove(id: string) {
    return `This action removes a #${id} room`;
  }
}
