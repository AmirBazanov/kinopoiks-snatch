import {Module} from '@nestjs/common';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {UserEvent} from './api-gateway/user.event';
import {UserQuery} from './api-gateway/user.query';
import {rmqUserConfig} from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [ UserQuery, UserEvent],
})
export class UserModule {}
