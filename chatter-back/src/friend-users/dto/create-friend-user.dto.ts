import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFriendUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  friendId: string;

  @IsOptional()
  createdAt: Date;
}
