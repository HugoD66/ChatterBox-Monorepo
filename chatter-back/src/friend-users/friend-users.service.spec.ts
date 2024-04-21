import { Test, TestingModule } from '@nestjs/testing';
import { FriendUsersService } from './friend-users.service';

describe('FriendUsersService', () => {
  let service: FriendUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendUsersService],
    }).compile();

    service = module.get<FriendUsersService>(FriendUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
