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
    console.log(createMessageDto);
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
  @Get('unread/temp')
  async findAllUnreads(): Promise<ResponseMessageDto[]> {
    //Ajouter user id
    return await this.messageService.findAllUnreads();
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
