import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { UserRole } from '../enum/user-role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(UserRole)
  role: UserRole;
}
