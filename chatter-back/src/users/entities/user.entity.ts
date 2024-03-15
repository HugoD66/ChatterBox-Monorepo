import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserGeneralRoleEnum } from './types/user.general.roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn(`uuid`)
  public id!: string;

  @Column({ length: 500, unique: true })
  public pseudo!: string;

  @Column({ nullable: true, length: 500 })
  public firstName: string;

  @Column({ nullable: true, length: 500 })
  public lastName: string;

  @Column({ nullable: true })
  public picture: string | null;

  @Index('email_index', { unique: true })
  @Column()
  public email!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  public password!: string;

  @Column({
    type: `enum`,
    enum: UserGeneralRoleEnum,
    default: UserGeneralRoleEnum.Utilisateur,
  })
  public roleGeneral: UserGeneralRoleEnum;
}
