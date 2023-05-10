import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { UserGatewayCommand } from '../users/user.api-gateway/user.gateway.command';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqUserConfig } from '../users/configs/amqp.user.config';
import { UserGatewayQuery } from '../users/user.api-gateway/user.gateway.query';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [UserGatewayCommand, UserGatewayQuery],
  providers: [AppService],
})
export class AppModule {}
