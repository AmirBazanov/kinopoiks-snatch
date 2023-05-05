import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonsService {
  getInfo(): { message: string } {
    return { message: `I'm Persons MICROSERVICE` };
  }
}
