import {Inject, Injectable} from '@nestjs/common';
import {MovieRepository} from "../repositories/movie.repository";
import {CreateMovieContract, IdMovieContract, TitleMovieContract} from "@kinopoisk-snitch/contracts";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class MoviesService {
  constructor(@Inject(MovieRepository)
              private readonly movieRepository: MovieRepository,
              private readonly amqpService: AmqpConnection,) {}
  async createMovie(movieDto: CreateMovieContract.Request) {
    const response = await this.movieRepository.createMovie(movieDto);
    return response;
  }

  async getMovieById(movieDto: IdMovieContract.Request) {
    const response = await this.movieRepository.getMovieById(movieDto.movie_id);
    return response;
  }

  async getMovieByTitle(movieDto: TitleMovieContract.Request) {
    const response = await this.movieRepository.getMovieByTitle(movieDto.title);
    return response;
  }
}
