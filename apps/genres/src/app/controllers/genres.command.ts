import {Controller} from "@nestjs/common";
import {GenresService} from "../services/genres.service";
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {CreateGenreContract} from "@kinopoisk-snitch/contracts";
import {createGenreRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";

@Controller()
export class GenresCommand {
  constructor(private readonly genresService: GenresService) {}

  @RabbitRPC(createGenreRMQConfig())
  async createGenre(@Payload() genreDto: CreateGenreContract.Request) {
    return await this.genresService.createGenre(genreDto);
  }
}
