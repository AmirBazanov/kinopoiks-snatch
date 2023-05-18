import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {
  CommentsEntity,
  TypeormModuleConfig,
  UsersEntity,
} from '@kinopoisk-snitch/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { CommentsModule } from '../comments/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity, CommentsEntity]),
    AuthModule,
    UserModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
