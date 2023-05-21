import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '@kinopoisk-snitch/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserContract } from '@kinopoisk-snitch/contracts';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly UserModel: Repository<UsersEntity>
  ) {}

  async createUser(userInfo: CreateUserContract.Request) {
    const passwordHash = await bcrypt.hash(userInfo['password'], 5);
    const temp = this.UserModel.create({
      ...userInfo,
      password: passwordHash,
      created_at: new Date(),
    });
    const newUser = await this.UserModel.save(temp);
    return newUser;
  }

  async findUserById(id: number) {
    const user = await this.UserModel.findOne({
      where: {
        user_id: id,
      },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.UserModel.findOneBy({ email: email });
    return user;
  }
}
