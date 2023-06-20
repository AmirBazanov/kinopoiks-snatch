import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '@kinopoisk-snitch/typeorm';
import {
  CreateUserContract,
  EditUserContract,
  IdUserContract,
} from '@kinopoisk-snitch/contracts';
import { USER_EXIST } from '@kinopoisk-snitch/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly UserModel: Repository<UsersEntity>
  ) {}

  async createUser(userInfo: CreateUserContract.Request) {
    const userFlag = await this.UserModel.findOne({
      where: {
        email: userInfo.email,
      },
    });
    if (!userFlag) {
      const passwordHash = await bcrypt.hash(userInfo['password'], 5);
      const temp = this.UserModel.create({
        ...userInfo,
        password: passwordHash,
        created_at: new Date(),
      });
      const newUser: CreateUserContract.Response = await this.UserModel.save(temp);
      return newUser;
    } else {
      return new BadRequestException(USER_EXIST);
    }
  }

  async findUserById(id: IdUserContract.Request) {
    const user = await this.UserModel.findOne({
      where: {
        user_id: id.user_id,
      },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.UserModel.findOneBy({ email: email });
    return user;
  }

  async editUser(userInfo: EditUserContract.Request, user_id: number) {
    const user = await this.UserModel.findOne({
      where: {
        user_id: user_id,
      },
    });
    Object.assign(user, userInfo);
    await this.UserModel.save(user);
  }

  async editToken(info: object) {
    const user = await this.UserModel.findOne({
      where: {
        user_id: info['user_id'],
      },
    });

    user.refresh_token = info['token'];
    await this.UserModel.save(user);
  }

  async deleteProfile(id: number) {
    const user = await this.UserModel.findOne({
      where: {
        user_id: id,
      },
    });
    await this.UserModel.remove(user);
  }
}
