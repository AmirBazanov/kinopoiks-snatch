import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersEntity } from '@kinopoisk-snitch/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommentsModule } from '../comments/comment.module';
import { CountriesModule } from '../countries/countries.module';
import { GenresModule } from '../genres/genres.module';
import { MoviesModule } from '../movies/movies.module';
import { PersonsModule } from '../persons/persons.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CommentsModule,
    CountriesModule,
    GenresModule,
    MoviesModule,
    PersonsModule,
    UsersEntity,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
