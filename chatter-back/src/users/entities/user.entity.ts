import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGeneralRoleEnum } from './types/user.general.roles.enum';
import { Message } from '../../message/entities/message.entity';
import { Exclude } from 'class-transformer';
import { FriendUser } from '../../friend-users/entities/friend-user.entity';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn(`uuid`)
  public id!: string;

  @Column({ length: 500, unique: true })
  public pseudo!: string;

  @Column({ nullable: true })
  public picture: string | null;

  @Index('email_index', { unique: true })
  @Column()
  public email!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @Exclude()
  @Column()
  public password!: string;

  @Column({
    type: `enum`,
    enum: UserGeneralRoleEnum,
    default: UserGeneralRoleEnum.Utilisateur,
  })
  public roleGeneral: UserGeneralRoleEnum;

  @OneToMany(() => Room, (room) => room.owner, {
    cascade: true,
  })
  roomsOwner: Room[];

  @OneToMany(() => FriendUser, (friendship: FriendUser) => friendship.user)
  friendships: FriendUser[];

  @ManyToMany(() => Room)
  @JoinTable()
  public roomsParticipant: Room[];

  @OneToMany(() => Message, (message) => message.sender)
  public sentMessages!: Message[];
  /*
  @OneToMany(() => Message, (message) => message.sender, {
    cascade: true,
  })
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver, {
    cascade: true,
  })
  receivedMessages: Message[];
  */
}
