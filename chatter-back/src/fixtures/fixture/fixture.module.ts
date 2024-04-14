import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { MessageModule } from '../../message/message.module';
import { UsersModule } from '../../users/users.module';
import { UsersService } from '../../users/users.service';
import { MessageService } from '../../message/message.service';
import { MessageFixtures } from '../message.fixtures';
import { UserFixtures } from '../user.fixtures';

@Module({
  imports: [UsersModule, MessageModule], // Ensure these modules provide necessary services
  controllers: [FixtureController],
  providers: [
    FixtureService,
    UserFixtures, // Provide UserFixtures if not provided by UsersModule
    MessageFixtures, // Provide MessageFixtures if not provided by MessageModule
  ],
  exports: [FixtureService], // Optional: Export FixtureService if it needs to be available elsewhere
})
export class FixtureModule {}
