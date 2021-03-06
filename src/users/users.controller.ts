import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Logger,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './models/user.model';
import { Roles } from 'src/auth/decorators/role.decorator';
import { Role } from './enum/role.enum';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersController.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.create(createUserDto);
  }

  /**
   * Only admin user allows to call this endpoint.
   */
  @Get()
  @Roles([Role.ADMIN])
  @ApiBearerAuth()
  findAll(): Promise<UserModel[]> {
    const message = 'UsersController.findAll()';
    this.logger.log(message);
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles([Role.ADMIN, Role.USER])
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'UUID for a particular user',
    example: '3f8ccd2a-28f2-4193-a8ff-df704663b3b2',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    const message = `UsersController.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles([Role.ADMIN, Role.USER])
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'UUID for a particular user',
    example: '3f8ccd2a-28f2-4193-a8ff-df704663b3b2',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    const message = `UsersController.update() id=${id} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles([Role.ADMIN, Role.USER])
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'UUID for a particular user',
    example: '3f8ccd2a-28f2-4193-a8ff-df704663b3b2',
  })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    const message = `UsersController.remove() id=${id}`;
    this.logger.log(message);
    return this.usersService.remove(id);
  }
}
