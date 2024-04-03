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
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { Public } from '../security/auth/public.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '../security/auth/auth.guard';

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

  @Get('/auth/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req): Promise<ResponseUserDto> {
    console.log(req);
    console.log('req.user');
    console.log(req.user);
    return this.usersService.findOne(req.user.id);
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

/*
TODO : 

   @ApiBearerAuth()
    @Get('me')
    @UseGuards(JwtAuthGuard)
    public getMe(@Req() req: RequestAuth<User>): Promise<Me> {
        return this.personRepository.findOne({
            relations: { organization: true, role: { permissions: true } },
            where: { user: { id: req.user.id } },
        });
    }
 */
