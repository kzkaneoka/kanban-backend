import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * This is username property.
   * @example 'user1'
   */
  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Username is too short' })
  @MaxLength(16, { message: 'Username is too long' })
  username: string;

  /**
   * This is email property.
   * @example 'user1@kanban.com'
   */
  @IsEmail()
  @IsDefined()
  email: string;

  /**
   * This is password property.
   * @example '123456'
   */
  @IsString()
  @IsDefined()
  @MinLength(4, { message: 'Password is too short' })
  @MaxLength(16, { message: 'Password is too long' })
  password: string;
}
