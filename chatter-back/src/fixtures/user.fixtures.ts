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
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Admin,
        picture: `./uploads/user/admin.png`,
      },
      {
        pseudo: `Hugo Dessauw`,
        email: `dessauw.hugo@gmail.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/admin.png`,
      },
      {
        pseudo: `John Doe`,
        email: `john1@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture1.png`,
      },
      {
        pseudo: `Jane Doe`,
        email: `jane1@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture1.png`,
      },
      {
        pseudo: `Alice Johnson`,
        email: `alice@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture2.png`,
      },
      {
        pseudo: `Bob Smith`,
        email: `bob@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture2.png`,
      },
      {
        pseudo: `Carol White`,
        email: `carol@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture3.png`,
      },
      {
        pseudo: `Dave Brown`,
        email: `dave@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture3.png`,
      },
      {
        pseudo: `Eve Black`,
        email: `eve@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userFFixture4.png`,
      },
      {
        pseudo: `Frank Green`,
        email: `frank@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Utilisateur,
        picture: `./uploads/user/userHFixture4.png`,
      },
      {
        pseudo: `Grace Blue`,
        email: `grace@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Admin,
        picture: `./uploads/user/userFFixture5.png`,
      },
      {
        pseudo: `Henry Yellow`,
        email: `henry@example.com`,
        password: `Azeaze.66`,
        roleGeneral: UserGeneralRoleEnum.Admin,
        picture: `./uploads/user/userHFixture5.png`,
      },
    ];

    for (const user of users) {
      await this.usersService.create(user);
    }

    const createdUsers = await this.usersService.findAllUsers();

    for (const createdUser of createdUsers) {
      for (let i = 0; i < 10; i++) {
        const randomUser =
          createdUsers[Math.floor(Math.random() * createdUsers.length)];
        if (randomUser.id !== createdUser.id) {
          await this.usersService.addFriend(createdUser.id, randomUser);
        }
      }
    }

    /*const createdUsers = await this.usersService.findAll();

    // Exemple de logique pour ajouter des amis
    const userAlice = createdUsers.find(
      (user: User) => user.pseudo === 'Alice Johnson',
    );
    const userHenry = createdUsers.find(
      (user) => user.pseudo === 'Henry Yellow',
    );

     if (userAlice && userHenry) {
      // Simulez une mise à jour pour ajouter un ami
      await this.usersService.addFriend(userHenry.id, userAlice);
    }

    */
  }
}
