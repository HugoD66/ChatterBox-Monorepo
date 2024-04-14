import { UserGeneralRoleEnum } from '../entities/types/user.general.roles.enum';
export declare class CreateUserDto {
    pseudo: string;
    email: string;
    roleGeneral?: UserGeneralRoleEnum;
    password: string;
    picture?: string;
}
