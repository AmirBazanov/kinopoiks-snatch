import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositpries/user.repository';
import { CreateUserDto } from '../dtos/create.user.dto';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async createUser(userInfo: CreateUserDto) {
    const newUser = await this.userRepository.createUser(userInfo);
    return newUser;
  }
}
