import { IsInt, IsString } from 'class-validator';

export class UpdateColumnDto {
  @IsString()
  name: string;

  @IsInt()
  order: number;
}
