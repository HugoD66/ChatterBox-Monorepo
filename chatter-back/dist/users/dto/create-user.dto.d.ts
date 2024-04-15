import { UserGeneralRoleEnum } from '../entities/types/user.general.roles.enum';
import { User } from '../entities/user.entity';
export declare class CreateUserDto {
    pseudo: string;
    email: string;
    roleGeneral?: UserGeneralRoleEnum;
    password: string;
    picture?: string;
    friends?: User[];
}
