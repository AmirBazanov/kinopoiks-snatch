import {Controller} from "@nestjs/common";
import {GenresService} from "../services/genres.service";
import {RabbitRPC} from "@golevelup/nestjs-rabbitmq";
import {deleteGenreRMQConfig, updateGenreRMQConfig} from "@kinopoisk-snitch/rmq-configs";
import {Payload} from "@nestjs/microservices";
import {UpdateGenreContract} from "@kinopoisk-snitch/contracts";

@Controller()
export class GenresEvent {
  constructor(private readonly genresService: GenresService) {}
  @RabbitRPC(updateGenreRMQConfig())
  async updateGenre(@Payload() genreDto: UpdateGenreContract.Request) {
    return await this.genresService.updateGenre(genreDto);
  }
  @RabbitRPC(deleteGenreRMQConfig())
  async deleteGenre(@Payload() genre_id: number) {
    return await this.genresService.deleteGenre(genre_id);
  }
}
