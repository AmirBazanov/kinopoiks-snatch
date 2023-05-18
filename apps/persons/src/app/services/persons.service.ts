import { PersonsEntity } from '@kinopoisk-snitch/typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(PersonsEntity)
    private readonly personRepository: Repository<PersonsEntity>
    ) {}

  async getPersonById(id: number) {
    const person = await this.personRepository.findOne({where: {person_id: id}});

    return person;
  }
}
