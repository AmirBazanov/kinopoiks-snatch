import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoviesEntity } from './movies.entity';
import { PersonsEntity } from './persons.entity';

@Entity('Awards')
export class AwardsEntity {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  award_id: number;

  @Column()
  name: string;

  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value.toISOString().slice(0, 10), // format the Date to YYYY-MM-DD
    },
  })
  year: Date;

  @Column()
  nomination: string;

  @ManyToOne(() => PersonsEntity, (person) => person.awards)
  @JoinColumn({ name: 'person_id' })
  person: PersonsEntity;

  @ManyToOne(() => MoviesEntity, (movie) => movie.awards)
  @JoinColumn({ name: 'movie_id' })
  movie: MoviesEntity;

  @Column({ default: false })
  is_eng: boolean;
}
