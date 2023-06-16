import {HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Between, In, LessThanOrEqual, MoreThanOrEqual, Repository} from 'typeorm';
import {AwardsEntity, GenresEntity, MoviesEntity} from '@kinopoisk-snitch/typeorm';
import {
  CreateMovieContract,
  FilteredMoviesContract,
  IdMovieContract,
  UpdateMovieContract
} from '@kinopoisk-snitch/contracts';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { getArrayPersonsOfMovieRMQConfig } from '@kinopoisk-snitch/rmq-configs';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(MoviesEntity)
    private readonly MovieModel: Repository<MoviesEntity>,
    @InjectRepository(GenresEntity)
    private readonly GenreModel: Repository<GenresEntity>,
    @InjectRepository(AwardsEntity)
    private readonly AwardModel: Repository<AwardsEntity>,
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

      let awards = [];

      if (movieInfo.awards_id) {
        awards = await this.getAwardsEntities(movieInfo);
      }

      const movie = await this.MovieModel.create({
        ...movieInfo,
        genres: genres,
        awards: awards,
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

  async getGenresEntities(movieDto: UpdateMovieContract.Request | CreateMovieContract.Request) {
    const genres: GenresEntity[] = [];
    for (const genre_id of movieDto.genres_id) {
      genres.push(await this.GenreModel.findOne({where: {genre_id: genre_id}}));
    }
    return genres;
  }

  async getAwardsEntities(movieDto: CreateMovieContract.Request) {
    const awards: AwardsEntity[] = [];
    for (const award_id of movieDto.awards_id) {
      awards.push(await this.AwardModel.findOne({where: {award_id: award_id}}));
    }
    return awards;
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

  async getFilteredMovies(filters: FilteredMoviesContract.Request) {
    try {
      const builder = this.MovieModel.createQueryBuilder("movies");

      const options = { is_eng: filters.is_eng };
      const orOptions = [];

      if (filters.yearFrom && filters.yearTo) {
        options["production_year"] = Between(new Date(filters.yearFrom), new Date(filters.yearTo));
      }

      if (filters.genreIds && filters.genreIds.length > 0) {
        options["genres"] = {genre_id: In(filters.genreIds)}
      }

      if (filters.countryIds && filters.countryIds.length > 0) {
        options["country"] = {country_id: In(filters.countryIds)}
      }

      if (filters.text) {
        const orOption1 = {...options};
        const orOption2 = {...options};

        orOption1["title"] = new RegExp(filters.text, 'i');
        orOption2["description"] = new RegExp(filters.text, 'i');

        orOptions.push(orOption1, orOption2);
      }

      const order = {};

      switch (filters.sort) {
        case ("title"):
          order["title"] = "ASC";
          break;

        case ("title_DESC"):
          order["title"] = "DESC";
          break;

        case ("year"):
          order["production_year"] = "ASC";
          break;

        case ("year_DESC"):
          order["production_year"] = "DESC";
          break;
      }

      const movies = await this.MovieModel.find(
        {
          where: orOptions.length > 0 ? orOptions : {...options},
          order: {...order}
        }
      );

      const totalPages = Math.ceil(movies.length / filters.perPage);
      const indexFrom = filters.perPage * (filters.page - 1);
      const indexTo = filters.perPage + indexFrom;

      return {
        movies: movies.slice(indexFrom, indexTo),
        totalPages: totalPages
      } ;
    } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getMoviesByGenre(genre_id: number) {
    try {
      const movies = await this.MovieModel.find({
        where: {genres: {genre_id: genre_id}},
        relations: {country: true, genres: true, awards: true, }
      });
      return movies;
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
