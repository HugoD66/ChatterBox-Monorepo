import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @MinLength(1)
  content: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  senderId: string;

  @IsOptional()
  receiverId: string;

  @IsOptional()
  isRead: boolean = false;
}
