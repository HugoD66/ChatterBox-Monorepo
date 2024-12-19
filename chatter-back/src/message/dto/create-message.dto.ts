import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Room } from '../../room/entities/room.entity';
import { User } from '../../users/entities/user.entity';

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(1)
  content: string;

  @IsOptional()
  createdAt: Date;

  @IsNotEmpty()
  sender: User;

  roomId: string;

  room?: Room;

  @IsOptional()
  isRead: boolean = false;
}
