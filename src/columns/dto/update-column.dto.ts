import { PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { CreateColumnDto } from './create-column.dto';

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  /**
   * This is order property.
   * @example '1'
   */
  @IsInt()
  order?: number;
}
