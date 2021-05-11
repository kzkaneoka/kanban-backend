import { IsDefined, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsDefined()
  name: string;
}
