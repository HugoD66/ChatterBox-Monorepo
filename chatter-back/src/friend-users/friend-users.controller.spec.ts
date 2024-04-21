import { Test, TestingModule } from '@nestjs/testing';
import { FriendUsersController } from './friend-users.controller';
import { FriendUsersService } from './friend-users.service';

describe('FriendUsersController', () => {
  let controller: FriendUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendUsersController],
      providers: [FriendUsersService],
    }).compile();

    controller = module.get<FriendUsersController>(FriendUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
