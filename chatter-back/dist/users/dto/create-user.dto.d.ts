import { UserRoleEnum } from '../entities/types/user.roles.enum';
export declare class CreateUserDto {
    pseudo: string;
    email: string;
    role?: UserRoleEnum;
    password: string;
}
