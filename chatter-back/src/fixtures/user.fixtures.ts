import { CreateUserDto } from '../users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserGeneralRoleEnum } from '../users/entities/types/user.general.roles.enum';

@Injectable()
export class UserFixtures {
  constructor(private usersService: UsersService) {}

  async seedUsers(): Promise<void> {
    const user: CreateUserDto = {
      pseudo: `Administrateur`,
      email: `test@test.com`,
      password: `Azeaze.66`,
      roleGeneral: UserGeneralRoleEnum.Admin,
    };
    console.log('user ! ');

    await this.usersService.register(user);
  }
}
