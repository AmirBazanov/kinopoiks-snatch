import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {CountriesEntity} from "./countries.entity";
import {GenresEntity} from "./genres.entity";
import {JoinTable} from "typeorm";
import {AwardsEntity} from "./awards.entity";
import { CommentsEntity } from "./comments.entity";


@Entity('Movies')
export class MoviesEntity{

  @PrimaryGeneratedColumn()
  movie_id: number;

  @Column({nullable: false})
  title: string

  @Column()
  orig_title: string;

  @Column()
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

  @Column({default: false})
  is_serial: boolean;

  @OneToMany(()=>AwardsEntity, award=>award.movie)
  @JoinTable()
  awards: AwardsEntity[]

  @ManyToMany(()=>GenresEntity, genre=>genre.movies)
  @JoinTable()
  genres: GenresEntity[]

  @ManyToOne(()=>CountriesEntity, country=>country.movies)
  @JoinColumn({name: 'country_id'})
  country: CountriesEntity

  @OneToMany(()=>CommentsEntity, comment=>comment.movie)
  @JoinTable()
  comments: CommentsEntity[]

  @Column()
  is_eng: boolean
}
