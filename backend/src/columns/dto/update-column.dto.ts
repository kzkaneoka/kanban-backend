import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  @IsInt()
  order: number;
}
