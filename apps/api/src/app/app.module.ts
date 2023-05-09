import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { rmqConfig } from '../../../auth/src/app/configs/amqp.config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqConfig()),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
