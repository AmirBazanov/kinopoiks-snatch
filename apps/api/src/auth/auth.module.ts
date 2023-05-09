import { Module } from '@nestjs/common';
import { AuthCommands } from './auth.commands';
import { rmqConfig } from './configs/amqp.config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rmqConfig())],
  controllers: [AuthCommands],
})
export class AuthModule {}
