import { IsDefined, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCardDto {
  /**
   * This is name property.
   * @example 'card1'
   */
  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Name is too short' })
  @MaxLength(255, { message: 'Name is too long' })
  name: string;

  /**
   * This is description property.
   * @example 'card1 description'
   */
  @IsString()
  @IsDefined()
  description: string;

  /**
   * This is columnId property.
   * @example 'b02de89a-affe-4f7a-9473-bea67c104da8'
   */
  @IsString()
  @IsDefined()
  columnId: string;
}
