import { CreateUserDto } from '../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserGeneralRoleEnum } from '../users/entities/types/user.general.roles.enum';

@Injectable()
export class UserFixtures {
  constructor(private usersService: UsersService) {}

  async seedUsers(): Promise<void> {
    const users: CreateUserDto[] = [
      {
        pseudo: `Aadministrateur`,
        email: `admin@email.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Admin,
        picture: `./uploads/user/admin.png`,
      },
      {
        pseudo: `Sender Test`,
        email: `sender-test@email.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture1.png`,
      },
      {
        pseudo: `Hugo Dessauw`,
        email: `dessauw.hugo@gmail.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/admin.png`,
      },
      {
        pseudo: `John Doe`,
        email: `john1@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture1.png`,
      },
      {
        pseudo: `Jane Doe`,
        email: `jane1@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture1.png`,
      },
      {
        pseudo: `Alice Johnson`,
        email: `alice@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture2.png`,
      },
      {
        pseudo: `Bob Smith`,
        email: `bob@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture2.png`,
      },
      {
        pseudo: `Carol White`,
        email: `carol@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture3.png`,
      },
      {
        pseudo: `Dave Brown`,
        email: `dave@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture3.png`,
      },
      {
        pseudo: `Eve Black`,
        email: `eve@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture4.png`,
      },
      {
        pseudo: `Frank Green`,
        email: `frank@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture4.png`,
      },
      {
        pseudo: `Grace Blue`,
        email: `grace@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Admin,
        picture: `./uploads/user/userFFixture5.png`,
      },
      {
        pseudo: `Henry Yellow`,
        email: `henry@example.com`,
        password: `Password.11`,
        roleGeneral: UserGeneralRoleEnum.Admin,
        picture: `./uploads/user/userHFixture5.png`,
      },
    ];

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
