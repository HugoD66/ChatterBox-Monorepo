import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { FriendStatusInvitation } from './enum/friend-status-invitation.enum';

@Entity()
export class FriendUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.friendships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: ResponseUserDto | User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'friendId' })
  friend: ResponseUserDto | User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: FriendStatusInvitation,
    default: FriendStatusInvitation.PENDING,
  })
  public status!: FriendStatusInvitation;
}
