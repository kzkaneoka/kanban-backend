import { IsDefined, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsString()
  @IsDefined()
  columnId: string;
}
