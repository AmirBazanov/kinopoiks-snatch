import {Inject, Injectable} from '@nestjs/common';
import {CreateGenreContract, IdGenreContract} from "@kinopoisk-snitch/contracts";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {GenreRepository} from "../repositories/genres.repository";
import { getGenresIdsArrayOfMoviesRMQConfig } from '@kinopoisk-snitch/rmq-configs';
import { InjectRepository } from '@nestjs/typeorm';
import { GenresEntity } from '@kinopoisk-snitch/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenresService {
  constructor(@Inject(GenreRepository)
              private readonly genreRepository: GenreRepository,
              private readonly amqpConnection: AmqpConnection,
              @InjectRepository(GenresEntity)
              private readonly genresRepo: Repository<GenresEntity>,
              ) {}

  async createGenre(genreDto: CreateGenreContract.Request) {
    return await this.genreRepository.createGenre(genreDto);
  }

  async getGenreById(genreDto: IdGenreContract.Request) {
    return await this.genreRepository.getGenreById(genreDto);
  }

  async getGenreByName(name: string) {
    return await this.genreRepository.getGenreByName(name);
  }

  async getAllGenres() {
    return await this.genreRepository.getAllGenres();
  }

  async getArrayGenresOfPerson(arrayIdsMovies: number[]) {
    const arrayNamesGenres: string[] = [];

    const arrayIdsGenres: number[] = await this.amqpConnection.request({
      exchange: getGenresIdsArrayOfMoviesRMQConfig().exchange,
      routingKey: getGenresIdsArrayOfMoviesRMQConfig().routingKey,
      payload: arrayIdsMovies,
    });

    for (let i = 0; i < arrayIdsGenres.length; i++) {
      const curGenre = await this.genresRepo.findOne({where: {genre_id: arrayIdsGenres[i]}});

      arrayNamesGenres[i] = curGenre.name;
    };

    return arrayNamesGenres;
  }
}
