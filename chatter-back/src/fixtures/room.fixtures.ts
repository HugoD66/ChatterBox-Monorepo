import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { UsersService } from '../users/users.service';
import { CreateRoomDto } from '../room/dto/create-room.dto';
import { User } from '../users/entities/user.entity';
import { ResponseUserDto } from '../users/dto/response-user.dto';

@Injectable()
export class RoomFixtures {
  constructor(
    private usersService: UsersService,
    private roomService: RoomService,
  ) {}

  async seedRooms(): Promise<void> {
    const userOwnerTest = await this.usersService.findOneByOptions({
      email: `dessauw.hugo@gmail.com`,
    });
    const participants: ResponseUserDto[] = await this.usersService.findAll();
    const privateParticipant: ResponseUserDto =
      await this.usersService.findOneByOptions({
        email: `sender-test@email.com`,
      });
    const rooms: CreateRoomDto[] = [
      {
        title: `Room test 1`,
        owner: userOwnerTest,
        createdAt: new Date(),
        participants: participants,
      },
      {
        title: `Room private test 2`,
        owner: userOwnerTest,
        createdAt: new Date(),
        participants: [privateParticipant],
      },
    ];

    for (const roomDto of rooms) {
      await this.roomService.create(roomDto);
    }
  }
}
