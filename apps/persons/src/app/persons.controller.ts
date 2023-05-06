import { Controller, Get } from '@nestjs/common';

import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly personService: PersonsService) {}

  @Get('info')
  getInfo() {
    return this.personService.getInfo();
  }
}
