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
import { UserModule } from '../users/user.module';
import { CommentsModule } from '../comments/comment.module';
import { PersonsModule } from '../persons/persons.module';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModuleConfig,
    TypeOrmModule.forFeature([UsersEntity, CommentsEntity, PersonsEntity]),
    AuthModule,
    UserModule,
    CommentsModule,
    PersonsModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
