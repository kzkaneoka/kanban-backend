import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enum/role.enum';
import { UserModel } from './models/user.model';

@Injectable()
export class UsersRepository {
  constructor(private readonly logger: Logger) {}

  create(createUserDto: CreateUserDto): Promise<UserModel> {
    const message = `UsersRepository.create() createUserDto=${JSON.stringify(
      createUserDto,
    )}`;
    this.logger.log(message);
    return UserModel.query()
      .insert({ ...createUserDto })
      .returning('*');
  }

  findAll(): Promise<UserModel[]> {
    const message = 'UsersRepository.findAll()';
    this.logger.log(message);
    return UserModel.query().orderBy('createdAt');
  }

  findOne(id: string): Promise<UserModel> {
    const message = `UsersRepository.findOne() id=${id}`;
    this.logger.log(message);
    return UserModel.query().findById(id);
  }

  findByUsername(username: string): Promise<UserModel> {
    const message = `UsersRepository.findByUsername() username=${username}`;
    this.logger.log(message);
    return UserModel.query().findOne({ username });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserModel> {
    const message = `UsersRepository.update() id=${id} updateUserDto=${JSON.stringify(
      updateUserDto,
    )}`;
    this.logger.log(message);
    return UserModel.query().updateAndFetchById(id, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
  }

  updateRole(id: string, role: Role): Promise<UserModel> {
    const message = `UsersRepository.updateRole() id=${id} role=${role}`;
    this.logger.log(message);
    return UserModel.query().updateAndFetchById(id, {
      role,
      updatedAt: new Date(),
    });
  }

  remove(id: string): Promise<UserModel> {
    const message = `UsersRepository.remove() id=${id}`;
    this.logger.log(message);
    return UserModel.query().deleteById(id).returning('*').first();
  }
}
