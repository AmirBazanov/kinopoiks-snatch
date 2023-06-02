import { Controller, Get } from '@nestjs/common';

import { CountriesService } from '../services/countries.service';

@Controller()
export class CountriesEvent {
  constructor(private readonly moviesService: CountriesService) {}

  @Get()
  getData() {
    return;
  }
}
