import { Module } from '@nestjs/common';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserGatewayCommand } from './user.api-gateway/user.gateway.command';
import { rmqUserConfig } from './configs/amqp.user.config';
import { UserGatewayEvent } from './user.api-gateway/user.gateway.event';
import { UserGatewayQuery } from './user.api-gateway/user.gateway.query';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [UserGatewayCommand, UserGatewayQuery, UserGatewayEvent],
})
export class UserModule {}
