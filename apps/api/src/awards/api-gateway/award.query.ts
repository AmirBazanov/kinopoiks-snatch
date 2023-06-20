import {Controller} from "@nestjs/common";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";


@Controller()
export class AwardQuery {
  constructor(private readonly amqpConnection: AmqpConnection) {}
}
