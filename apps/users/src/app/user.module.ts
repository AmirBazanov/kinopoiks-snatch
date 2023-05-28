import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserCommand } from './controllers/user.command';
import { UserQuery } from './controllers/user.query';
import { UserEvent } from './controllers/users.event';
import { UserRepository } from './repositpries/user.repository';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigModule } from '@nestjs/config';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rmqUserConfig } from '@kinopoisk-snitch/rmq-configs';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqUserConfig()),
  ],
  controllers: [UserCommand, UserQuery, UserEvent],
  providers: [UserService, UserRepository, JwtService],
})
export class UserModule {}
