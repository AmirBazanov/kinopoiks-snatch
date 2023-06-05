import {Inject, Injectable} from '@nestjs/common';
import {MovieRepository} from "../repositories/movie.repository";
import {
  CreateMovieContract,
  DeleteMovieContract,
  IdMovieContract,
  TitleMovieContract,
  UpdateMovieContract
} from "@kinopoisk-snitch/contracts";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";
import { MoviesEntity } from '@kinopoisk-snitch/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MoviesService {
  constructor(@Inject(MovieRepository)
              private readonly movieRepository: MovieRepository,
              private readonly amqpService: AmqpConnection,
              @InjectRepository(MoviesEntity)
              private readonly moviesRepo: Repository<MoviesEntity>) {}
  async createMovie(movieDto: CreateMovieContract.Request) {
    const response = await this.movieRepository.createMovie(movieDto);
    return response;
  }

  async updateMovie(movieDto: UpdateMovieContract.Request) {
    const response = await this.movieRepository.updateMovie(movieDto);
    return response;
  }

  async getMovieById(movieDto: IdMovieContract.Request) {
    const response = await this.movieRepository.getMovieById(movieDto);
    return response;
  }

  async getMovieByTitle(movieDto: TitleMovieContract.Request) {
    const response = await this.movieRepository.getMovieByTitle(movieDto.title);
    return response;
  }

  async getAllMovies() {
    const response = await this.movieRepository.getAllMovies();
    return response;
  }

  async deleteMovie(id: number) {
    return await this.movieRepository.deleteMovie(id);
  }

  async getGenresIdsArrayOfMovies(arrayIdsMovies: number[]) {
    const arrayIdsGenresForMovies = [];

    for (let i = 0; i < arrayIdsMovies.length; i++) {
      const curMovie = await this.moviesRepo.findOne({
        where: {
          movie_id: arrayIdsMovies[i]
        },
        relations: {
          genres: true,
        },
        select: {
          genres: {
            genre_id: true,
          }
        }
      });

      const lengthGenres = curMovie.genres.length;

      for (let j = 0; j < lengthGenres; j++) {
        arrayIdsGenresForMovies.push(await curMovie.genres[j].genre_id);
      }
    }

    return arrayIdsGenresForMovies;
  }
}
