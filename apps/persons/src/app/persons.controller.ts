import { Controller, Get } from '@nestjs/common';

import { PersonsService } from './persons.service';

@Controller('persons')
export class PersonsController {
  constructor(private readonly appService: PersonsService) {}

  @Get('info')
  getInfo() {
    return this.appService.getInfo();
  }
}
