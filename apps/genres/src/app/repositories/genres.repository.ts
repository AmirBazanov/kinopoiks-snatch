import {HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {GenresEntity} from "@kinopoisk-snitch/typeorm";
import {Repository} from "typeorm";
import {
  CreateGenreContract,
  IdGenreContract,
  UpdateGenreContract
} from "@kinopoisk-snitch/contracts";

@Injectable()
export class GenreRepository {
  constructor(
    @InjectRepository(GenresEntity)
    private readonly GenreModel: Repository<GenresEntity>
  ) {}

  async createGenre(genreDto: CreateGenreContract.Request) {
    try {
      const genre = await this.GenreModel.create({
        ...genreDto
      });
      await this.GenreModel.save(genre);
      return {httpStatus: HttpStatus.OK, message: "Genre crated successfully"}
    } catch (e) {
      return {httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error"}
    }
  }

  async getGenreById(id: IdGenreContract.Request) {
    try {
      const country = await this.GenreModel.findOne({
        where: {genre_id: Number(id)}
      });

      return {httpStatus: HttpStatus.OK, ...country};
    } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getGenreByName(name: string) {
    try {
      const genres = await this.GenreModel.findOne({
        where: {name: name}
      });
      if (genres) return genres;
      return await this.GenreModel.findBy({
        name: name
      });
    } catch (e) {
      return {httpStatus: HttpStatus.NOT_FOUND}
    }
  }

  async getAllGenres() {
    return await this.GenreModel.find();
  }

  async updateGenre(genreDto: UpdateGenreContract.Request) {
    try {
      const genre = await this.GenreModel.update(
        { genre_id: genreDto.genre_id },
        { ...genreDto }
      );
      return {
        httpStatus: HttpStatus.OK,
        message: `Genre updated successfully:\n${genre}`,
      };
    } catch (e) {
      console.log(e);
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
    }
  }

  async deleteGenre(id: number) {
    try {
      const genre = await this.GenreModel.findOne({
        where: {
          genre_id: id,
        },
      });
      await this.GenreModel.remove(genre);
      return {
        httpStatus: HttpStatus.OK,
        message: 'Genre deleted successfully',
      };
    } catch (e) {
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Could not delete genre',
      };
    }
  }
}
