import { Module } from '@nestjs/common';

import { AuthCommands } from './auth.commands';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqConfig } from './config/amqp.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMQModule.forRoot(RabbitMQModule, rmqConfig()),
  ],
  controllers: [AuthCommands],
  providers: [AppService],
})
export class AppModule {}
