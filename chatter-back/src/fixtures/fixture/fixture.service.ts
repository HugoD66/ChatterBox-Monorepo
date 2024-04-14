import { Injectable } from '@nestjs/common';
import { UserFixtures } from '../user.fixtures';
import { MessageFixtures } from '../message.fixtures';
@Injectable()
export class FixtureService {
  constructor(
    private readonly userFixtures: UserFixtures,
    private readonly messageFixtures: MessageFixtures,
  ) {}

  async seedUsers(): Promise<string> {
    await this.userFixtures.seedUsers();
    return 'Users fixtures generated';
  }

  async seedMessages(): Promise<string> {
    await this.messageFixtures.seedMessages();
    return 'Messages fixtures generated';
  }
  /* create(createFixtureDto: CreateFixtureDto) {
    return 'This action adds a new fixture';
  }

  findAll() {
    return `This action returns all fixture`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fixture`;
  }

  update(id: number, updateFixtureDto: UpdateFixtureDto) {
    return `This action updates a #${id} fixture`;
  }

  remove(id: number) {
    return `This action removes a #${id} fixture`;
  }*/
}
