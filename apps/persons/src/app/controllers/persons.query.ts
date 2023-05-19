import { Controller } from '@nestjs/common';
import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { PersonsService } from '../services/persons.service';
import { Payload } from '@nestjs/microservices';
import {
  getPersonByIdRMQConfig,
} from '@kinopoisk-snitch/rmq-configs';

@Controller()
export class PersonsQuery {
  constructor(
    private readonly personService: PersonsService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitRPC(getPersonByIdRMQConfig())
  async getPersonById(@Payload() person_id: number) {
    const person = await this.personService.getPersonById(person_id);

    // const career = await this.amqpConnection.request({
    //   exchange: getCareerArrayOfPerson().exchange,
    //   routingKey: getCareerArrayOfPerson().routingKey,
    //   payload: person_id,
    // })

    // const genres = await this.amqpConnection.request({
    //   exchange: getGenresArrayOfPerson().exchange,
    //   routingKey: getGenresArrayOfPerson().routingKey,
    //   payload: person_id,
    // })

    const countMovies = 100; //= await this.amqpConnection.request({
    //   exchange: getCountMoviesArrayOfPerson().exchange,
    //   routingKey: getCountMoviesArrayOfPerson().routingKey,
    //   payload: person_id,
    // })

    return {
      fullName: person.name + ' ' + person.sur_name,
      career: [],
      genres: [],
      height: person.height,
      dateBirth: person.date_birth,
      placeBirth: person.place_birth,
      spouse: person.spouse,
      photoLink: person.photo,
      countMovies: countMovies,
      isEng: person.is_eng
    }
  }
}