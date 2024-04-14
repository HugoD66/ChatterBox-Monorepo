import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Entity()
export class Message {
  @PrimaryGeneratedColumn(`uuid`)
  public id!: string;

  @Column()
  public content!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: ResponseUserDto;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiver: ResponseUserDto;

  @Column()
  public isRead!: boolean;
}