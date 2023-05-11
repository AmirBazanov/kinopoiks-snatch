import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { UserGatewayCommand } from '../users/user.api-gateway/user.gateway.command';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqUserConfig } from '../users/configs/amqp.user.config';
import { UserGatewayQuery } from '../users/user.api-gateway/user.gateway.query';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AuthModule } from '../auth/auth.module';
import { rmqConfig } from '../auth/config/amqp.config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqConfig()),
    AuthModule,
  ],
    controllers: [UserGatewayCommand, UserGatewayQuery],
  providers: [],
})
export class AppModule {}
