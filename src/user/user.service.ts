import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const users = await this.prisma.user.findMany();
    if (users.find((user) => user.login === createUserDto.login)) {
      throw new ConflictException('User already exists');
    }
    const dateNow = Date.now();
    const user = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
    };
    await this.prisma.user.create({
      data: { id: user.id, ...createUserDto, version: user.version },
    });
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    const usersWithoutPasswords = [];
    users.forEach((user) => {
      usersWithoutPasswords.push({
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      });
    });
    return usersWithoutPasswords;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (user) {
      return {
        id: user.id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const dateNow = Date.now();
    if (updateUserDto.oldPassword === user.password) {
      await this.prisma.user.update({
        where: { id: id },
        data: {
          password: updateUserDto.newPassword,
          version: user.version + 1,
        },
      });
      return {
        id: user.id,
        login: user.login,
        version: user.version + 1,
        createdAt: user.createdAt.getTime(),
        updatedAt: dateNow,
      };
    } else {
      throw new HttpException('Old password is incorrect', 403);
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id: id } });
  }
}
