import {HttpStatus, Injectable, Logger} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {GenresEntity, MoviesEntity} from '@kinopoisk-snitch/typeorm';
import {CreateMovieContract, DeleteMovieContract, IdMovieContract} from '@kinopoisk-snitch/contracts';
import {UpdateMovieContract} from "../../../../../libs/contracts/src/lib/movies/update.movie.contract";
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { getArrayPersonsOfMovieRMQConfig } from '@kinopoisk-snitch/rmq-configs';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly MovieModel: Repository<MoviesEntity>,
    @InjectRepository(GenresEntity)
    private readonly GenreModel: Repository<GenresEntity>,
    private readonly amqpConnection: AmqpConnection
  ) {}

  async createMovie(
    movieInfo: CreateMovieContract.Request,
  ) {
    try {
      let genres = [];

      if (movieInfo.genres_id) {
        genres = await this.getGenresEntities(movieInfo);
      }
      const movie = await this.MovieModel.create({
        ...movieInfo,
        genres: genres,
        country: {
          country_id: movieInfo.country_id,
        }
      });
      await this.MovieModel.save(movie);
      return {httpStatus: HttpStatus.OK, message: "Movie crated successfully"}
    } catch (e) {
      return {httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}
    }
  }

  async updateMovie(updateDto: UpdateMovieContract.Request) {
    try {
      const country_id = updateDto.country_id;
      delete updateDto.country_id;
      // let genres = [];
      //
      // if (updateDto.genres_id) {
      //   genres = await this.getGenresEntities(updateDto);
      // }
      const movie = await this.MovieModel.update(
        {movie_id: updateDto.movie_id},
        {...updateDto, country: {country_id: country_id}}
      );
      return {httpStatus: HttpStatus.OK, message: "Movie updated successfully"}
    } catch (e) {
      console.log(e)
      return {httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}
    }
  }

  async getGenresEntities(updateDto: UpdateMovieContract.Request | CreateMovieContract.Request) {
    const genres: GenresEntity[] = [];
    for (const genre_id of updateDto.genres_id) {
      genres.push(await this.GenreModel.findOne({where: {genre_id: genre_id}}));
    }
    return genres;
  }

  async getMovieById(id: IdMovieContract.Request) {
    try {
      const movie = await this.MovieModel.findOne({
        where: {
          movie_id: Number(id),
        },
        relations: {country: true, genres: true, awards: true}
      });

      const persons = await this.amqpConnection.request({
        exchange: getArrayPersonsOfMovieRMQConfig().exchange,
        routingKey: getArrayPersonsOfMovieRMQConfig().routingKey,
        payload: id,
      });

      return {httpStatus: HttpStatus.OK, ...movie, persons};
    } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getMovieByTitle(title: string) {
    try {
    const movies = await this.MovieModel.findOne({
      where: {title: title},
      relations: {country: true, genres: true, awards: true, }
    });
    if (movies) return movies;
    return await this.MovieModel.findBy({
      orig_title: title
    });
  } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getAllMovies() {
    return await this.MovieModel.find({relations: {country: true, genres: true, awards: true}});
  }

  async deleteMovie(id: number) {
    try {
      const movie = await this.MovieModel.findOne({
        where: {
          movie_id: id
        },
      });
      await this.MovieModel.remove(movie);
      return {httpStatus: HttpStatus.OK, message: "Movie deleted successfully"}
    } catch(e) {
      return {httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, message: "Could not delete movie"}
    }
  }
}
