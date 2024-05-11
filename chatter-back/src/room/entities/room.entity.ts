import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../message/entities/message.entity';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Entity()
export class Room {
  @PrimaryGeneratedColumn(`uuid`)
  public id!: string;

  @Column({ length: 500, unique: true })
  public title!: string;

  @ManyToOne(() => User, (user) => user.roomsOwner, {
    onDelete: 'CASCADE',
  })
  public owner!: ResponseUserDto;

  @CreateDateColumn()
  public createdAt!: Date;

  @ManyToMany(() => User, (user) => user.roomsParticipant)
  @JoinTable()
  public participants!: ResponseUserDto[];

  @OneToMany(() => Message, (message: Message) => message.room)
  public messages!: Message[];
}
