import { Module } from '@nestjs/common';

import { AppCommands } from './app.commands';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqConfig } from './configs/amqp.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRoot(RabbitMQModule, rmqConfig()),
  ],
  controllers: [AppCommands],
  providers: [AppService],
})
export class AppModule {}
