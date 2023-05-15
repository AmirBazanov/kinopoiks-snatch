import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentCommand } from './controllers/comment.command';
import { CommentQuery } from './controllers/comment.query';
import { CommentEvent } from './controllers/comment.event';
import { ConfigModule } from '@nestjs/config';
import { TypeormModuleConfig, UsersEntity } from '@kinopoisk-snitch/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rmqCommentConfig } from '@kinopoisk-snitch/rmq-configs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, rmqCommentConfig()),
  ],
  controllers: [CommentCommand, CommentQuery, CommentEvent],
  providers: [CommentService],
})
export class CommentModule {}
