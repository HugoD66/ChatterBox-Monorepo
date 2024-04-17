import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ResponseMessageDto } from './dto/response-message.dto';
import { Message } from './entities/message.entity';
import { Public } from '../security/auth/public.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return await this.messageService.create(createMessageDto);
  }

  @Public() //TODO TEMP
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Public() //TODO TEMP
  @Get()
  async findAll(): Promise<ResponseMessageDto[]> {
    return await this.messageService.findAll();
  }

  @Public() //TODO TEMP
  @Get('unread/:id')
  async findAllUnreads(
    @Param('id') receiverId: string,
  ): Promise<ResponseMessageDto[]> {
    //Ajouter user id
    return await this.messageService.findAllUnreads(receiverId);
  }

  @Public() //TODO TEMP
  @Get('discussion/:friendId/:userId')
  async findDiscussion(
    @Param('friendIdid') friendId: string,
    @Param('userId') userId: string,
  ): Promise<ResponseMessageDto[]> {
    //Ajouter user id
    return await this.messageService.findDiscussion(friendId, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<ResponseMessageDto> {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.messageService.remove(id);
  }
}
