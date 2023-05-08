import {Body, Controller, Post} from '@nestjs/common';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {CreateUserDto} from "../dtos/create.user.dto";

@Controller()
export class UserGatewayCommand {

  constructor(private readonly amqpConnection: AmqpConnection) {}
  @Post("/createUser")
  async createUser(@Body() userDto: CreateUserDto) {
    await this.amqpConnection.publish("UsersExchange", "create-user", userDto);
    console.log("msg publish");
  }
}
