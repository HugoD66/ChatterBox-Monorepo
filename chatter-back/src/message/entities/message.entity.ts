import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Room } from '../../room/entities/room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn(`uuid`)
  public id!: string;

  @Column()
  public content!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @ManyToOne(() => User, (user: User) => user.sentMessages)
  public sender!: User;

  @ManyToOne(() => Room, (room: Room) => room.messages)
  public room!: Room;

  @Column({ default: false })
  public isRead!: boolean;
}
