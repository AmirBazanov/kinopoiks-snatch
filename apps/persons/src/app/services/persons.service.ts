import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { getCountMoviesOfPersonRMQConfig, getGenresArrayOfPersonRMQConfig, getMoviesOfPersonRMQConfig } from '@kinopoisk-snitch/rmq-configs';
import { PersonsEntity } from '@kinopoisk-snitch/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PersonRepository } from '../repositories/person.repository';
import {IdPersonContract, UpdatePersonContract} from '@kinopoisk-snitch/contracts';
import {CreatePersonContract} from "../../../../../libs/contracts/src/lib/persons/create.person.contract";
import {rethrow} from "@nestjs/core/helpers/rethrow";

@Injectable()
export class PersonsService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly amqpConnection: AmqpConnection
    ) {}

  async getPersonById(personDto: IdPersonContract.Request) {
    try {
      const person = await this.personRepository.getPersonById(personDto);

      const carrer = await this.getCareerOfPerson(person);
      const genres = await this.getGenresOfPerson(person);
      const countMovies = await this.getCountMoviesOfPerson(person);
      const movies = await this.getMoviesOfPerson(person);

      return {HttpStatus: HttpStatus.OK, ...person, carrer, genres, countMovies, movies }
    }
    catch (e) {
      return { HttpStatus: HttpStatus.NOT_FOUND }
    }
  }

  async getPersonByName(fullName: string) {
    return await this.personRepository.getPersonByName(fullName);
  }

  async getPersonsOfMovie(id: number) {
    return await this.personRepository.getPersonsOfMovie(id);
  }

  private async getGenresOfPerson(person: PersonsEntity) {
    const arrayIdsMovies = await this.personRepository.getArrayIdsMoviesForGenresPersons(person);

    return await this.amqpConnection.request({
      exchange: getGenresArrayOfPersonRMQConfig().exchange,
      routingKey: getGenresArrayOfPersonRMQConfig().routingKey,
      payload: arrayIdsMovies,
    });
  }

  private async getCareerOfPerson(person: PersonsEntity) {
    return await this.personRepository.getCareerOfPerson(person);
  }

  private async getCountMoviesOfPerson(person: PersonsEntity) {
    return await this.amqpConnection.request({
      exchange: getCountMoviesOfPersonRMQConfig().exchange,
      routingKey: getCountMoviesOfPersonRMQConfig().routingKey,
      payload: person.person_id,
    });
  }

  private async getMoviesOfPerson(person: PersonsEntity) {
    return await this.amqpConnection.request({
      exchange: getMoviesOfPersonRMQConfig().exchange,
      routingKey: getMoviesOfPersonRMQConfig().routingKey,
      payload: person.person_id,
    });
  }

  async createPerson(personDto: CreatePersonContract.Request) {
    return await this.personRepository.createPerson(personDto);
  }

  async updatePerson(personDto: UpdatePersonContract.Request) {
    return await this.personRepository.updatePerson(personDto);
  }

  async deletePerson(id: number) {
    return await this.personRepository.deletePerson(id);
  }
}
