import { UserGeneralRoleEnum } from './types/user.general.roles.enum';
import { Message } from '../../message/entities/message.entity';
export declare class User {
    id: string;
    pseudo: string;
    picture: string | null;
    email: string;
    createdAt: Date;
    password: string;
    roleGeneral: UserGeneralRoleEnum;
    sentMessages: Message[];
    receivedMessages: Message[];
}
