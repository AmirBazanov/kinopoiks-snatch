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
import { MoviesEntity, MoviesPersonsRolesEntity } from '@kinopoisk-snitch/typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {getByFilmIdCommentsRMQConfig} from "@kinopoisk-snitch/rmq-configs";

@Injectable()
export class MoviesService {
  constructor(@Inject(MovieRepository)
              private readonly movieRepository: MovieRepository,
              private readonly amqpService: AmqpConnection,
              @InjectRepository(MoviesEntity)
              private readonly moviesRepo: Repository<MoviesEntity>,
              @InjectRepository(MoviesPersonsRolesEntity)
              private readonly moviesPersonsRolesRepository: Repository<MoviesPersonsRolesEntity>,
              private readonly amqpConnection: AmqpConnection
              ) {}
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
    try {
      const comments = this.amqpConnection.request({
        exchange: getByFilmIdCommentsRMQConfig().exchange,
        routingKey: getByFilmIdCommentsRMQConfig().routingKey,
        payload: Number(movieDto)
      });
      return {...response, comments: comments};
    } catch (e) {
      return {...response, comments: null};
    }
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
        if (arrayIdsGenresForMovies.includes(curMovie.genres[j].genre_id))
          continue;

        arrayIdsGenresForMovies.push(await curMovie.genres[j].genre_id);
      }
    }

    return arrayIdsGenresForMovies;
  }

  async getCountMoviesOfPerson(person_id: number) {
    const arrayIdsMovies = [];

    const arrayIdsMoviesForPerson = await this.moviesPersonsRolesRepository.find({
      where: {
        person: {
          person_id: person_id,
        },
      },
      relations: {
        movie: true
      },
      select: {
        movie: {
          movie_id: true,
        }
      },
    });

    for (let i = 0; i < arrayIdsMoviesForPerson.length; i++) {
      if (arrayIdsMovies.includes(arrayIdsMoviesForPerson[i].movie.movie_id))
        continue;

      arrayIdsMovies.push(arrayIdsMoviesForPerson[i].movie.movie_id);
    }

    return arrayIdsMovies.length;
  }

  async getMoviesOfPerson(person_id: number) {
    const arrayMovies = [];
    const arrayIdsMovies = [];

    const arrayMoviesOfPerson = await this.moviesPersonsRolesRepository.find({
      where: {
        person: {
          person_id: person_id,
        },
      },
      relations: {
        person: true,
        role: true,
        movie: true,
      },
      select: {
        movie: {
          movie_id: true,
          title: true,
        },
        role: {
          name: true,
        }
      }
    });

    for (let i = 0; i < arrayMoviesOfPerson.length; i++) {
      const curMovie = arrayMoviesOfPerson[i];

      const movie = {
        movie_id: curMovie.movie.movie_id,
        title: curMovie.movie.title,
        role: curMovie.role.name,
      }

      if (arrayMovies.includes(movie))
        continue;

      arrayMovies.push(movie);
    }

    return arrayMovies;
  }
}
