import {Controller} from "@nestjs/common";
import {GenresService} from "../services/genres.service";
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {
  getAllGenresRMQConfig,
  getGenreByNameRMQConfig,
  getGenreRMQConfig
} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {IdGenreContract, NameGenreContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class GenresQuery {
  constructor(private readonly genresService: GenresService) {}
  @RabbitRPC(getGenreRMQConfig())
  async getGenreById(@Payload() genreDto: IdGenreContract.Request) {
    return await this.genresService.getGenreById(genreDto);
  }

  @RabbitRPC(getGenreByNameRMQConfig())
  async getGenreByName(@Payload() genreDto: NameGenreContract.Request) {
    return await this.genresService.getGenreByName(genreDto.name);
  }

  @RabbitRPC(getAllGenresRMQConfig())
  async getAllGenres() {
    return await this.genresService.getAllGenres();
  }
}
