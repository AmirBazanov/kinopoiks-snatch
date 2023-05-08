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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'UsersExchange',
          type: 'topic',
        },
      ],
      uri: 'amqp://nestjs:nestjs@localhost:5672',
      connectionInitOptions: { wait: false },
      enableControllerDiscovery: true,
    }),
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
