import { Injectable } from '@nestjs/common';
import { UserFixtures } from '../user.fixtures';
import { MessageFixtures } from '../message.fixtures';
import { UsersService } from '../../users/users.service';
import { MessageService } from '../../message/message.service';

@Injectable()
export class FixtureService {
  constructor(
    private readonly userFixtures: UserFixtures,
    private readonly messageFixtures: MessageFixtures,
    private usersService: UsersService,
    private messageService: MessageService,
  ) {}

  async seedUsers(): Promise<string> {
    await this.userFixtures.seedUsers();
    return 'Users fixtures generated';
  }

  async seedMessages(): Promise<string> {
    await this.messageFixtures.seedMessages();
    return 'Messages fixtures generated';
  }

  async deleteAll(): Promise<string> {
    await this.usersService.removeAll();
    console.log('All users and user relations deleted');
    return 'All fixtures deleted';
  }
}
