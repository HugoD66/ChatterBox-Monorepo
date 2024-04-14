import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { Public } from '../security/auth/public.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../security/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../multer.config';
import { FileSizeValidationPipe } from '../pipe/FileSizeValidationPipe';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @UsePipes(new ValidationPipe())
  @Post(`auth/register`)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    console.log(createUserDto);
    const user = await this.usersService.register(createUserDto);
    console.log(user);
    return user;
  }

  @Get('/auth/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req): Promise<ResponseUserDto> {
    console.log(req);
    console.log('req.user');
    console.log(req.user);
    return this.usersService.findOne(req.user.id);
  }

  @Public()
  @Post(`/auth/login`)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.usersService.login(loginDto);
  }

  @Public()
  @Post(`/auth/logout`)
  @UseGuards(AuthGuard)
  async logout(): Promise<void> {
    return;
  }

  @Post(`upload-file/:userId`)
  @UseInterceptors(FileInterceptor(`file`, multerConfig))
  async uploadFile(
    @Param(`userId`) userId: string,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ) {
    await this.usersService.update(userId, { picture: file.path });
    return { message: `File uploaded successfully`, filePath: file.path };
  }

  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
