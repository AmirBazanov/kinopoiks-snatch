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
      const movie = await this.MovieModel.findBy({
        movie_id: id,
      });

      return {httpStatus: HttpStatus.OK, ...movie};
    } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getMovieByTitle(title: string) {
    try {
    const comments = await this.MovieModel.findBy({
      title: title
    });
    if (comments) return comments;
    return await this.MovieModel.findBy({
      orig_title: title
    });
  } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }
}
