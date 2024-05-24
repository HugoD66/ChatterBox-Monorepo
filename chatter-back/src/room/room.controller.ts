import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ResponseRoomDto } from './dto/response-room.dto';
import { Room } from './entities/room.entity';
import { ResponseMessageDto } from '../message/dto/response-message.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomService.create(createRoomDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ResponseRoomDto> {
    return this.roomService.findOne(id);
  }

  @Get()
  findAll(): Promise<ResponseRoomDto[]> {
    return this.roomService.findAll();
  }

  @Get('/group/:userId')
  findAllGroupRoom(
    @Param('userId') userId: string,
  ): Promise<ResponseRoomDto[]> {
    return this.roomService.findAllGroupRoom(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<ResponseRoomDto> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }

  @Get('/unreads-messages/:id')
  findAllUnreadsMessages(
    @Param('id') id: string,
  ): Promise<ResponseMessageDto[]> {
    return this.roomService.findAllUnreadMessages(id);
  }

  @Get('/:userId/:participantId')
  getRoomByUser(
    @Param('userId') userId: string,
    @Param('participantId') participantId: string,
  ): Promise<Room> {
    return this.roomService.getRoomByUser({ userId, participantId });
  }
}
