import { Module } from '@nestjs/common';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserCommand } from './api-gateway/user.command';
import { rmqUserConfig } from './config/amqp.user.config';
import { UserEvent } from './api-gateway/user.event';
import { UserQuery } from './api-gateway/user.query';

@Module({
  imports: [
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [UserCommand, UserQuery, UserEvent],
})
export class UserModule {}
