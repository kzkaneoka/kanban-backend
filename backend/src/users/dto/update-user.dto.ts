import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { UserRoleEnum } from '../enum/user-role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
