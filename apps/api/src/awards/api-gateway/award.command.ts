import {Body, Controller, Post} from "@nestjs/common";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {CreateAwardDto} from "../dtos/create-award.dto";
import {createAwardConfig} from "@kinopoisk-snitch/rmq-configs";


@Controller("/awards")
export class AwardCommand {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Post("/createAward")
  async createAward(@Body() awardInfo: CreateAwardDto) {
    try {
      await this.amqpConnection.publish(
        createAwardConfig().exchange,
        createAwardConfig().routingKey,
        awardInfo
      );
    }catch (e) {
      throw new Error(e);
    }
  }
}
