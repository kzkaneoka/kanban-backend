import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { Role } from '../enum/role.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEnum(Role)
  role: Role;
}
