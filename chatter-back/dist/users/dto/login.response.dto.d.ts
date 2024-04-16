import { User } from '../entities/user.entity';
export declare class LoginResponseDto {
    id: string;
    email: string;
    access_token: string;
    friends: User[];
}
