import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateColumnDto {
  /**
   * This is name property.
   * @example 'column1'
   */
  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Name is too short' })
  @MaxLength(255, { message: 'Name is too long' })
  name: string;
}
