
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
// import {AwardsEntity} from "./libs/typeorm/Entities/awards.entity";
// import {CountriesEntity} from "./libs/typeorm/Entities/countries.entity";
// import {GenresEntity} from "./libs/typeorm/Entities/genres.entity";
// import {MoviesEntity} from "./libs/typeorm/Entities/movies.entity";
// import {PersonsEntity} from "./libs/typeorm/Entities/persons.entity";
// import {RolesEntity} from "./libs/typeorm/Entities/roles.entity";

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  // entities: [AwardsEntity, CountriesEntity, GenresEntity, MoviesEntity, PersonsEntity, RolesEntity],
  entities: ['libs/typeorm/Entities/**.entity.ts']
});
