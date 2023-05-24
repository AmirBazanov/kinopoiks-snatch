import { Controller, Get } from '@nestjs/common';

import { MoviesService } from '../services/movies.service';

@Controller()
export class MoviesEvent {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getData() {
    return this.moviesService.getData();
  }
}
