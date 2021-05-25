import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Name is too short' })
  @MaxLength(255, { message: 'Name is too long' })
  name: string;
}
