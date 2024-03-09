import { UserRoleEnum } from './types/user.roles.enum';
export declare class User {
    id: string;
    pseudo: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRoleEnum;
}
