import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonsEntity } from '@kinopoisk-snitch/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsRepository {
  constructor(
    @InjectRepository(PersonsEntity)
    private readonly PersonsModel: Repository<PersonsEntity>
  ) {}

  async createPerson(data: PersonsEntity) {
    const createdEntity = this.PersonsModel.create({ ...data });
    return this.PersonsModel.save(createdEntity);
  }
}
