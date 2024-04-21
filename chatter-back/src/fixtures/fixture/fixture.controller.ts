import { Controller, Delete, Post } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { Public } from '../../security/auth/public.decorator';

@Controller('fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Post(`users`)
  createUsers(): Promise<string> {
    return this.fixtureService.seedUsers();
  }

  @Post(`messages-fixtures`)
  createMessagesFixtures(): Promise<string> {
    return this.fixtureService.seedMessages();
  }

  @Public()
  @Post(`friend-fixtures`)
  createFriendsFixtures(): Promise<string> {
    return this.fixtureService.seedFriends();
  }

  @Public()
  @Delete()
  deleteAllFixtures(): Promise<string> {
    return this.fixtureService.deleteAll();
  }
}
