import { Module } from '@nestjs/common';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserGatewayCommand } from './user.api-gateway/user.gateway.command';
import { rmqUserConfig } from './config/amqp.user.config';
import { UserGatewayEvent } from './user.api-gateway/user.gateway.event';
import { UserGatewayQuery } from './user.api-gateway/user.gateway.query';

@Module({
  imports: [
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [UserGatewayCommand, UserGatewayQuery, UserGatewayEvent],
})
export class UserModule {}
