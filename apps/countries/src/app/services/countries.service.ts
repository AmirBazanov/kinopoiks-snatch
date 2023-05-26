import {Inject, Injectable} from '@nestjs/common';
import {CountryRepository} from "../repositories/country.repository";
import {
  CreateCountryContract,
  CreateMovieContract,
  IdMovieContract,
  TitleMovieContract
} from "@kinopoisk-snitch/contracts";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class CountriesService {
  constructor(@Inject(CountryRepository)
              private readonly countryRepository: CountryRepository,
              private readonly amqpService: AmqpConnection,) {}
  async createCountry(countryDto: CreateCountryContract.Request) {
    //const response = await this.countryRepository.createMovie(countryDto);
    //return response;
  }

  async getMovieById(movieDto: IdMovieContract.Request) {
    //const response = await this.movieRepository.getMovieById(movieDto.movie_id);
    //return response;
  }

  async getMovieByTitle(movieDto: TitleMovieContract.Request) {
    //const response = await this.movieRepository.getMovieByTitle(movieDto.title);
    //return response;
  }

  async getAllMovies() {
    //const response = await this.movieRepository.getAllMovies();
    //return response;
  }
}
