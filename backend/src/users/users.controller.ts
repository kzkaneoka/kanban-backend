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

@Controller('users')
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

  @Get()
  @Roles([Role.ADMIN])
  findAll(): Promise<UserModel[]> {
    const message = 'UsersController.findAll()';
    this.logger.log(message);
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles([Role.ADMIN, Role.USER])
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    const message = `UsersController.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Roles([Role.ADMIN, Role.USER])
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
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<UserModel> {
    const message = `UsersController.remove() id=${id}`;
    this.logger.log(message);
    return this.usersService.remove(id);
  }
}
