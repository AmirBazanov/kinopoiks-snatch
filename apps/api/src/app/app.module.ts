import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  CommentsEntity,
  PersonsEntity,
  TypeormModuleConfig,
  UsersEntity,
} from '@kinopoisk-snitch/typeorm';
import { AuthModule } from '../auth/auth.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import * as process from 'process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity, CommentsEntity, PersonsEntity]),
    AuthModule,
    RabbitMQModule.forRoot(RabbitMQModule, { uri: process.env.RABBITMQ_URI }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
