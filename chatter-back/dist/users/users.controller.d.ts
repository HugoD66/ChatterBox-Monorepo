/// <reference types="multer" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginDto } from './dto/login.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(createUserDto: CreateUserDto): Promise<ResponseUserDto>;
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    logout(): Promise<void>;
    getMe(req: any): Promise<ResponseUserDto>;
    uploadFile(userId: string, file: Express.Multer.File): Promise<{
        message: string;
        filePath: string;
    }>;
    findAll(): Promise<ResponseUserDto[]>;
    findOne(id: string): Promise<ResponseUserDto>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseUserDto>;
    remove(id: string): Promise<void>;
}
