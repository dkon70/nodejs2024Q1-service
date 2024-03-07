import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';

const users = [];

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    if (users.find(user => user.login === createUserDto.login)) {
      throw new ConflictException('User already exists');
    }
    const user = {id: uuidv4(), login: createUserDto.login, password: createUserDto.password, version: 1, createdAt: Date.now(), updatedAt: Date.now() };
    users.push(user);
    return { id: user.id, login: user.login, version: user.version, createdAt: user.createdAt, updatedAt: user.updatedAt };
  }

  findAll() {
    return users;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const user = users.find(item => item.id === id);
    if (user) {
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const user = users.find(item => item.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.oldPassword === user.password) {
      user.password = updateUserDto.newPassword;
      user.updatedAt = Date.now();
      user.version++;
      return { id: user.id, login: user.login, version: user.version, createdAt: user.createdAt, updatedAt: user.updatedAt };
    } else {
      throw new HttpException('Old password is incorrect', 403);
    }
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const user = users.find(item => item.id === id);
    if (user) {
      const index = users.indexOf(user);
      users.splice(index, 1);
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
