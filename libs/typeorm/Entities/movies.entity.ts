import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CountriesEntity} from "./countries.entity";
import {GenresEntity} from "./genres.entity";
import {JoinTable} from "typeorm/browser";


@Entity('Movies')
export class MoviesEntity{

  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column({nullable: false})
  title: string

  @Column()
  orig_title: string;

  @Column('year')
  production_year: Date;

  @Column()
  tagline: string;

  @Column('int')
  budget: number;

  @Column('int')
  marketing: number;

  @Column('date')
  dvd_release: Date;

  @Column('date')
  blueray_release: Date;

  @Column('int2')
  age_limit: number;

  @Column('int2')
  mpaa_rating: number;

  @Column('int2')
  duration_min: number;

  @Column()
  film_description: string;

  @Column()
  language: string;

  @Column({default: false})
  is_serial: boolean;

  @ManyToMany(()=>GenresEntity, genre=>genre.genre_id)
  @JoinTable()
  genres: GenresEntity[]

  @ManyToOne(()=>CountriesEntity, county=>county.country_id)
  @Column()
  production_country_id: number

}
