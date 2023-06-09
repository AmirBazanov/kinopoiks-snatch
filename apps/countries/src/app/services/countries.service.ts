import {Inject, Injectable} from '@nestjs/common';
import {CountryRepository} from "../repositories/country.repository";
import {
  CreateCountryContract,
  IdCountryContract,
  TitleMovieContract, UpdateCountryContract
} from "@kinopoisk-snitch/contracts";
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class CountriesService {
  constructor(@Inject(CountryRepository)
              private readonly countryRepository: CountryRepository,
              private readonly amqpService: AmqpConnection,) {}
  async createCountry(countryDto: CreateCountryContract.Request) {
    const response = await this.countryRepository.createCountry(countryDto);
    return response;
  }

  async getCountryById(countryDto: IdCountryContract.Request) {
    const response = await this.countryRepository.getCountryById(countryDto);
    return response;
  }

  async getCountryByName(name: string) {
    const response = await this.countryRepository.getCountryByName(name);
    return response;
  }

  async getAllCountries() {
    const response = await this.countryRepository.getAllCountries();
    return response;
  }

  async updateCountry(countryDto: UpdateCountryContract.Request) {
    const response = await this.countryRepository.updateCountry(countryDto);
    return response;
  }

  async deleteCountry(country_id: number) {
    const response = await this.countryRepository.deleteCountry(country_id);
    return response;
  }
}
