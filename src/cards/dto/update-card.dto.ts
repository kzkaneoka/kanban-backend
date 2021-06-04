import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { Status } from '../enum/status.enum';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  /**
   * This is order property.
   * @example '1'
   */
  @IsInt()
  order?: number;

  /**
   * This is status property.
   * @example 'todo'
   */
  @IsEnum(Status)
  status?: Status;
}
