import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositpries/user.repository';
import {
  CreateUserContract,
  EditUserContract,
  IdUserContract,
} from '@kinopoisk-snitch/contracts';
import process from 'process';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async createUser(userInfo: CreateUserContract.Request) {
    const newUser = await this.userRepository.createUser(userInfo);
    return newUser;
  }

  async getUserById(id: IdUserContract.Request) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }

  async editUser(userInfo: EditUserContract.Request) {
    const userFromToken = this.jwtService.verify(userInfo.user_id, {
      secret: process.env.JWT_SECRET,
    });
    const user_id = Number(userFromToken['user_id']);
    delete userInfo.user_id;
    const user = await this.userRepository.editUser(userInfo, user_id);
    return user;
  }

  async deleteProfile(id: number) {
    await this.userRepository.deleteProfile(id);
  }
}
