import { IsEnum, IsInt, IsString, IsUUID } from 'class-validator';
import { CardStatusEnum } from '../enum/card-status.enum';

export class UpdateCardDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  order: number;

  @IsEnum(CardStatusEnum)
  status: CardStatusEnum;

  @IsUUID()
  columnId: string;
}
