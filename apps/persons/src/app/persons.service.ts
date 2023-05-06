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

  getInfo(): { message: string } {
    return { message: `I'm Persons MICROSERVICE` };
  }
}
