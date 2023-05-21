import { Module } from '@nestjs/common';
import { AuthCommands } from './auth.commands';
import { rmqConfig } from './config/amqp.config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { GoogleStrategy } from '../strategies/google-oauth.strategy';
import { VKStrategy } from '../strategies/vk-oauth.strategy';

@Module({
  imports: [RabbitMQModule.forRoot(RabbitMQModule, rmqConfig())],
  controllers: [AuthCommands],
  providers: [GoogleStrategy, VKStrategy],
})
export class AuthModule {}
