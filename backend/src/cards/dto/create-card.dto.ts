import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Name is too short' })
  @MaxLength(255, { message: 'Name is too long' })
  name: string;

  @IsString()
  @IsDefined()
  description: string;

  @IsString()
  @IsDefined()
  columnId: string;
}
