import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt } from 'class-validator';
import { CardStatusEnum } from '../enum/card-status.enum';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  @IsInt()
  order: number;

  @IsEnum(CardStatusEnum)
  status: CardStatusEnum;
}
