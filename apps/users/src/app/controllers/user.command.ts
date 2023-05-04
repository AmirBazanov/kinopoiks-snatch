import {Body, Controller} from '@nestjs/common';
import {CreateUserDto} from "../dtos/create.user.dto";
import {UserRepository} from "../repositpries/user.repository";
import {UserService} from "../services/user.service";

@Controller()
export class UserCommand {
  constructor(private readonly userService: UserService) {}

  //какие то настройки rmq
  async createUser(@Body() userDto: CreateUserDto) {
    const user = this.userService.createUser(userDto);
    return user;
  }

  async editUserProfile() {
    const user = this.userService.editUserProfile(id);
    return user;
  }
}
