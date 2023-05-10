import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UserGatewayCommand } from './user.api-gateway/user.gateway.command';
import { UserGatewayQuery } from './user.api-gateway/user.gateway.event';
import { UserGatewayEvent } from './user.api-gateway/user.gateway.query';
import { rmqUserConfig } from './configs/amqp.user.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [
    AppController,
    UserGatewayCommand,
    UserGatewayQuery,
    UserGatewayEvent,
  ],
  providers: [AppService],
})
export class AppModule {}
