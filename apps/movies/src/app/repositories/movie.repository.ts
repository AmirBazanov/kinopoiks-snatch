import {HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {MoviesEntity} from '@kinopoisk-snitch/typeorm';
import {CreateMovieContract} from '@kinopoisk-snitch/contracts';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly MovieModel: Repository<MoviesEntity>
  ) {}

  async createMovie(
    movieInfo: CreateMovieContract.Request,
  ) {
    try {
      const movie = await this.MovieModel.create({
        ...movieInfo,
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

  async getMovieById(id: number) {
    try {
      const movie = await this.MovieModel.findOne({
        where: {
          movie_id: id,
        },
        relations: {country: true},
        lock: { mode: "optimistic", version: 1 },
      });

      return {httpStatus: HttpStatus.OK, ...movie};
    } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getMovieByTitle(title: string) {
    try {
    const movies = await this.MovieModel.findOne({
      where: {title: title},
      relations: {country: true}
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
    return await this.MovieModel.find({relations: {country: true}});
  }
}
