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

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'friendlist',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'friendId',
      referencedColumnName: 'id',
    },
  })
  friends: User[];
}
