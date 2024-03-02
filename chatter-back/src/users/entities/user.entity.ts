import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from './types/user.roles.enum';

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

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @Column({
    type: `enum`,
    enum: UserRoleEnum,
    default: UserRoleEnum.Utilisateur,
  })
  public role: UserRoleEnum;
}
