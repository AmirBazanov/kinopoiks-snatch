import { Module } from '@nestjs/common';
import { AuthCommands } from './auth.commands';
import { rmqConfig } from './config/amqp.config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { GoogleStrategy } from '../strategies/google-oauth.strategy';
import { VKStrategy } from '../assets/strategies/vk-oauth.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, rmqConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthCommands],
  providers: [GoogleStrategy, VKStrategy],
})
export class AuthModule {}
