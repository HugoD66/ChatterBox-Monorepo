import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<ResponseUserDto>;
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    findOne(id: string): Promise<ResponseUserDto>;
    findAll(): Promise<ResponseUserDto[]>;
    update(id: string, updateUserDto: Partial<User>): Promise<ResponseUserDto>;
    remove(id: string): Promise<void>;
}
