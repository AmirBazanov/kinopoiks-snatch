import { AwardsEntity, MoviesPersonsRolesEntity, PersonsEntity } from '@kinopoisk-snitch/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonsEntity)
    private readonly personRepository: Repository<PersonsEntity>,
    @InjectRepository(AwardsEntity)
    private readonly awardsRepository: Repository<AwardsEntity>,
    @InjectRepository(MoviesPersonsRolesEntity)
    private readonly moviesPersonsRolesRepository: Repository<MoviesPersonsRolesEntity>,
    ) {}

  async getPersonById(id: number) {
    const person = await this.personRepository.findOne({where: {person_id: id}, relations: {awards: true}});

    // const career = await this.amqpConnection.request({
    //   exchange: getCareerArrayOfPersonRMQConfig().exchange,
    //   routingKey: getCareerArrayOfPersonRMQConfig().routingKey,
    //   payload: person_id,
    // })

    // const genres = await this.amqpConnection.request({
    //   exchange: getGenresArrayOfPersonRMQConfig().exchange,
    //   routingKey: getGenresArrayOfPersonRMQConfig().routingKey,
    // const countries = await this.amqpConnection.request({
    //   exchange: getGenresArrayOfPerson().exchange,
    //   routingKey: getGenresArrayOfPerson().routingKey,
    //   payload: person_id,
    // })

    const countMovies = 100; //= await this.amqpConnection.request({
    //   exchange: getCountMoviesArrayOfPersonRMQConfig().exchange,
    //   routingKey: getCountMoviesArrayOfPersonRMQConfig().routingKey,
    //   payload: person_id,
    // })

    //const awards = person.awards;

    return {
      fullName: person.name + ' ' + person.sur_name,
      career: [],
      genres: [],
      awards: person.awards,
      height: person.height,
      dateBirth: person.date_birth,
      placeBirth: person.place_birth,
      spouse: person.spouse,
      photoLink: person.photo,
      countMovies: countMovies,
      isEng: person.is_eng,
    }
  }

  
}
