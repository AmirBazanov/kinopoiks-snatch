import {HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {CountriesEntity} from '@kinopoisk-snitch/typeorm';
import {CreateCountryContract, IdCountryContract} from '@kinopoisk-snitch/contracts';

@Injectable()
export class CountryRepository {
  constructor(
    @InjectRepository(CountriesEntity)
    private readonly CountryModel: Repository<CountriesEntity>
  ) {}

  async createCountry(
    countryInfo: CreateCountryContract.Request,
  ) {
    try {
      const country = await this.CountryModel.create({
        ...countryInfo
      });
      await this.CountryModel.save(country);
      return {httpStatus: HttpStatus.OK, message: "Country crated successfully"}
    } catch (e) {
      return {httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}
    }
  }

  async getCountryById(id: IdCountryContract.Request) {
    try {
      const country = await this.CountryModel.findOne({
        where: {country_id: Number(id)},
        relations: {movies: true}
      });

      return {httpStatus: HttpStatus.OK, ...country};
    } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getCountryByName(name: string) {
    try {
    const countries = await this.CountryModel.findOne({
      where: {name: name},
      relations: {
        movies: true,
      }
    });
    if (countries) return countries;
    return await this.CountryModel.findBy({
      name: name
    });
  } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getAllCountries() {
    return await this.CountryModel.find();
  }
}
