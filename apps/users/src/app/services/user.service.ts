import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositpries/user.repository';
import { CreateUserContract } from '@kinopoisk-snitch/contracts';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async createUser(userInfo: CreateUserContract.Request) {
    const newUser = await this.userRepository.createUser(userInfo);
    return newUser;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findUserById(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }

  async deleteProfile(id: number) {
    await this.userRepository.deleteProfile(id);
  }
}
