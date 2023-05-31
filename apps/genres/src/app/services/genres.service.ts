import {Inject, Injectable} from '@nestjs/common';
import {CreateGenreContract, IdGenreContract} from "@kinopoisk-snitch/contracts";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import {GenreRepository} from "../repositories/genres.repository";

@Injectable()
export class GenresService {
  constructor(@Inject(GenreRepository)
              private readonly genreRepository: GenreRepository,
              private readonly amqpService: AmqpConnection,) {}
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
}
