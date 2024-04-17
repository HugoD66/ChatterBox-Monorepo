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
  Put,
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
import { ChangePasswordDto } from './dto/ChangePasswordDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @UsePipes(new ValidationPipe())
  @Post(`auth/register`)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserDto> {
    const user: ResponseUserDto =
      await this.usersService.register(createUserDto);
    return user;
  }

  @Get('/auth/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req): Promise<ResponseUserDto> {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(`/auth/password-change`)
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    const isSuccess = await this.usersService.changePassword(
      changePasswordDto,
      req.user.id,
    );
    return isSuccess;
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

  @UseGuards(AuthGuard)
  @Post(`upload-file/:userId`)
  @UseInterceptors(FileInterceptor(`file`, multerConfig))
  async uploadFile(
    @Param(`userId`) userId: string,
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
  ) {
    await this.usersService.update(userId, { picture: file.path });
    return { message: `File uploaded successfully`, filePath: file.path };
  }

  @Get(`get-picture`)
  @UseGuards(AuthGuard)
  async getPicture(@Req() req) {
    return this.usersService.getPicture(req.user.id);
  }

  @Public()
  @Get()
  async findAll(): Promise<ResponseUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') userId: string,
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserDto> {
    if (req.user.id === userId) {
      return this.usersService.update(userId, updateUserDto);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  // FRIENDS
  @Public()
  @Get(`/friends/:userId`)
  async getFriends(@Param('userId') userId: string) {
    return this.usersService.getFriends(userId);
  }

  @Post(`/add-friend/:userId/:friendId`)
  async addFriend(@Body() body: { userId: string; friendId: string }) {
    return this.usersService.addFriend(body.userId, body.friendId);
  }
}
