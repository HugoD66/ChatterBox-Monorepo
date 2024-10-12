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

  async findDiscussionByUser(
    userId: string,
    participantId: string,
  ): Promise<ResponseRoomDto> {
    console.log('userId' + userId);
    console.log('participantId' + participantId);
    return await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participant')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.messages', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .where(
        '(owner.id = :userId AND participant.id = :participantId) OR (owner.id = :participantId AND participant.id = :userId)',
        { userId, participantId },
      )
      .groupBy('room.id, owner.id, participant.id, message.id, sender.id')
      .having('COUNT(DISTINCT participant.id) <= 1')
      .getOne();
  }

  /*async findOne(id: string): Promise<ResponseRoomDto> {
    return await this.roomRepository.findOne({
      where: { id },
      relations: ['messages', 'messages.sender', 'owner', 'participants'],
      order: { createdAt: 'DESC' },
    });
  }*/

  async findOne(id: string): Promise<Room> {
    return await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.messages', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.participants', 'participant')
      .where('room.id = :id', { id })
      .orderBy('message.createdAt', 'DESC')
      .getOne();
  }

  async findAllGroupRoom(userId: string): Promise<ResponseRoomDto[]> {
    return await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participant')
      .leftJoinAndSelect('room.owner', 'owner')
      .leftJoinAndSelect('room.messages', 'message')
      .leftJoinAndSelect('message.sender', 'sender')
      .where('owner.id = :userId OR participant.id = :userId', { userId })
      .groupBy('room.id, owner.id, participant.id, message.id, sender.id')
      .having('COUNT(participant.id) > 1')
      .getMany();
  }

  async findAll(): Promise<ResponseRoomDto[]> {
    return await this.roomRepository.find({
      relations: ['messages', 'messages.sender', 'owner', 'participants'],
    });
  }

  async findAllUnreadMessages(userId: string): Promise<ResponseMessageDto[]> {
    const roomList = await this.roomRepository.find({
      relations: ['messages', 'messages.sender', 'owner', 'participants'],
    });

    return roomList
      .map((room) =>
        room.messages.map((message) => ({ ...message, roomId: room.id })),
      )
      .flat()
      .filter((message) => !message.isRead && message.sender.id !== userId);
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

  async getRoomByUser({ userId, participantId }): Promise<Room> {
    console.log('ICI ROOMBYUSER', userId, participantId);
    return await this.roomRepository
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.participants', 'participant')
      .leftJoinAndSelect('room.owner', 'owner')
      .where('room.ownerId = :userId', { userId })
      .andWhere('participant.id = :participantId', { participantId })
      .groupBy('room.id, participant.id, owner.id')
      .having('COUNT(participant.id) = 1')
      .getOne();
  }
}
