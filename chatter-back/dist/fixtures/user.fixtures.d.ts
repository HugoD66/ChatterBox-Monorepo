import { UsersService } from '../users/users.service';
export declare class UserFixtures {
  private usersService;
  constructor(usersService: UsersService);
  seedUsers(): Promise<void>;
}
