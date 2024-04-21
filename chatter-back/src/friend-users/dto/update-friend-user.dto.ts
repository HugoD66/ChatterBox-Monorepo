import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendUserDto } from './create-friend-user.dto';

export class UpdateFriendUserDto extends PartialType(CreateFriendUserDto) {}
