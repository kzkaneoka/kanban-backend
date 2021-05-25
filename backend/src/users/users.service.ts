import { Injectable, Logger } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from './models/user.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersService.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    createUserDto.password = await hashSync(createUserDto.password, 10);
    return this.usersRepository.create(createUserDto);
  }

  findAll(): Promise<UserModel[]> {
    const message = 'UsersService.findAll()';
    this.logger.log(message);
    return this.usersRepository.findAll();
  }

  findOne(id: string): Promise<UserModel> {
    const message = `UsersService.findOne() id=${id}`;
    this.logger.log(message);
    return this.usersRepository.findOne(id);
  }

  findByUsername(username: string): Promise<UserModel> {
    const message = `UsersService.findByUsername() username=${username}`;
    this.logger.log(message);
    return this.usersRepository.findByUsername(username);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    const message = `UsersService.update() id=${id} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    if (updateUserDto.password !== undefined) {
      updateUserDto.password = await hashSync(updateUserDto.password, 10);
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string): Promise<UserModel> {
    const message = `UsersService.remove() id=${id}`;
    this.logger.log(message);
    return this.usersRepository.remove(id);
  }
}
