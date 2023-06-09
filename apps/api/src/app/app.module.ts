import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { CommentsModule } from '../comments/comment.module';
import { PersonsModule } from '../persons/persons.module';
import { MoviesModule } from '../movies/movies.module';
import { CountriesModule } from '../countries/countries.module';
import { GenresModule } from '../genres/genres.module';
import {AdminModule} from "../admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    CommentsModule,
    PersonsModule,
    MoviesModule,
    CountriesModule,
    GenresModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
