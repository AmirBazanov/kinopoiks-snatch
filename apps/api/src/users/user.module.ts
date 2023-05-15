import { Module } from '@nestjs/common';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserCommand } from './api-gateway/user.command';
import { UserEvent } from './api-gateway/user.event';
import { UserQuery } from './api-gateway/user.query';
import { rmqUserConfig } from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [UserCommand, UserQuery, UserEvent],
})
export class UserModule {}
