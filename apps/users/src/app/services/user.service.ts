import {Inject, Injectable} from '@nestjs/common';
import {UserRepository} from "../repositpries/user.repository";
import {CreateUserDto} from "../dtos/create.user.dto";

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async createUser(userDto: CreateUserDto) {
    const newUser = await this.userRepository.createUser(userDto);
    return newUser;
  }

  async editUserProfile(id: number) {
    const user = this.userRepository.findUserById(id);
    //какие-то изменения юзера
    return user;
  }
}
