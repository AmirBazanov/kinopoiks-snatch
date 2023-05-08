import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { CreateUserDto } from '../dtos/create.user.dto';

@Controller()
export class UserCommand {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC({
    exchange: 'UsersExchange',
    routingKey: 'create-user',
    queue: 'queue1',
  })
  async createUser(userDto: CreateUserDto) {
    console.log('Пришло');
    await this.userService.createUser(userDto);
    //в параметры Payload()
    //отправлять requestom
  }
}
