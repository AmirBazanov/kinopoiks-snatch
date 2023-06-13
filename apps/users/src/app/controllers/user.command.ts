import { Controller, HttpException } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Payload } from '@nestjs/microservices';
import {
  CreateUserContract,
  EditUserContract,
} from '@kinopoisk-snitch/contracts';
import {
  createUserRMQConfig,
  deleteUserRMQConfig,
  editTokenRMQConfig,
  editUserRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class UserCommand {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC(createUserRMQConfig())
  async createUser(@Payload() userDto: CreateUserContract.Request) {
    const newUser = await this.userService.createUser(userDto);
    if (newUser instanceof HttpException) {
      return { error: newUser };
    }
    return newUser;
  }

  @RabbitRPC(editUserRMQConfig())
  async editUser(@Payload() userInfo: EditUserContract.Request) {
    const user = await this.userService.editUser(userInfo);
    return user;
  }

  @RabbitRPC(editTokenRMQConfig())
  async editToken(@Payload() info: object) {
    await this.userService.editToken(info);
  }

  @RabbitRPC(deleteUserRMQConfig())
  async deleteUser(@Payload() id: number) {
    await this.userService.deleteProfile(id);
  }
}
