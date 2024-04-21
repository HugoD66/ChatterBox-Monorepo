import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Entity()
export class FriendUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.friendships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: ResponseUserDto;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'friendId' })
  friend: ResponseUserDto;

  @CreateDateColumn()
  createdAt: Date;
}
