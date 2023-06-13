import { Module } from '@nestjs/common';

import { AuthCommands } from './auth.commands';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqConfig } from './config/amqp.config';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.forRoot(RabbitMQModule, rmqConfig()),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthCommands],
  providers: [AuthService],
})
export class AppModule {}
