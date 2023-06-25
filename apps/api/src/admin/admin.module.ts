import { Module } from '@nestjs/common';
import {AwardModule} from "./awards/award.module";
import {PersonsModule} from "./persons/persons.module";
import {CountriesModule} from "./counries/countries.module";
import {GenresModule} from "./genres/genres.module";
import {MoviesModule} from "./movies/movies.module";
import {UsersModule} from "./users/users.module";


@Module({
  imports:[AwardModule, PersonsModule, CountriesModule, GenresModule, MoviesModule, UsersModule],
})
export class AdminModule {}
