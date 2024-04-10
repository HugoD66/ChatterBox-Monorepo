import { UserGeneralRoleEnum } from './types/user.general.roles.enum';
export declare class User {
    id: string;
    pseudo: string;
    picture: string | null;
    email: string;
    createdAt: Date;
    password: string;
    roleGeneral: UserGeneralRoleEnum;
}
