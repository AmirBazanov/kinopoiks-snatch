import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '@kinopoisk-snitch/typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly UserModel: Repository<UsersEntity>
  ) {}

  async createUser(userInfo: CreateUserDto) {
    const passwordHash = await bcrypt.hash(userInfo['password'], 5);
    const temp = this.UserModel.create({
      ...userInfo,
      password: passwordHash,
      created_at: new Date(),
    });
    const newUser = await this.UserModel.save(temp);
    return newUser;
  }
}
