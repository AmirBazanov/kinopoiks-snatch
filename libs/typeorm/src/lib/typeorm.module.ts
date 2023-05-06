import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AwardsEntity } from './entities/awards.entity';
import { CommentsEntity } from './entities/comments.entity';
import { CountriesEntity } from './entities/countries.entity';
import { FriendsEntity } from './entities/friends.entity';
import { GenresEntity } from './entities/genres.entity';
import { MoviesEntity } from './entities/movies.entity';
import { PersonsEntity } from './entities/persons.entity';
import { RolesEntity } from './entities/roles.entity';
import { UserMoviesInfoEntity } from './entities/user-movies-info.entity';
import { UsersEntity } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        entities: [
          AwardsEntity,
          CommentsEntity,
          CountriesEntity,
          FriendsEntity,
          GenresEntity,
          MoviesEntity,
          PersonsEntity,
          RolesEntity,
          UserMoviesInfoEntity,
          UsersEntity,
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
  ],
})
export class TypeormModuleConfig {}
