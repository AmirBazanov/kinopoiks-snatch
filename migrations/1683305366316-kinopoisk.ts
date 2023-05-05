import { MigrationInterface, QueryRunner } from "typeorm";

export class Kinopoisk1683305366316 implements MigrationInterface {
    name = 'Kinopoisk1683305366316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres_movies_movies" ("genresGenreId" integer NOT NULL, "moviesMovieId" integer NOT NULL, CONSTRAINT "PK_af4f022c9f15d49e853f1762d31" PRIMARY KEY ("genresGenreId", "moviesMovieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8f2d8b16242819b9943b6a140e" ON "genres_movies_movies" ("genresGenreId") `);
        await queryRunner.query(`CREATE INDEX "IDX_90ea70a0f559d2c0657bca1b56" ON "genres_movies_movies" ("moviesMovieId") `);
        await queryRunner.query(`ALTER TABLE "genres_movies_movies" ADD CONSTRAINT "FK_8f2d8b16242819b9943b6a140ea" FOREIGN KEY ("genresGenreId") REFERENCES "Genres"("genre_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "genres_movies_movies" ADD CONSTRAINT "FK_90ea70a0f559d2c0657bca1b562" FOREIGN KEY ("moviesMovieId") REFERENCES "Movies"("movie_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres_movies_movies" DROP CONSTRAINT "FK_90ea70a0f559d2c0657bca1b562"`);
        await queryRunner.query(`ALTER TABLE "genres_movies_movies" DROP CONSTRAINT "FK_8f2d8b16242819b9943b6a140ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_90ea70a0f559d2c0657bca1b56"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8f2d8b16242819b9943b6a140e"`);
        await queryRunner.query(`DROP TABLE "genres_movies_movies"`);
    }

}
