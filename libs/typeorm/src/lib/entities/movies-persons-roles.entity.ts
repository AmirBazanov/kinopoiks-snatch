import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MoviesEntity } from './movies.entity';
import { PersonsEntity } from './persons.entity';
import { RolesEntity } from './roles.entity';

@Entity('MoviesPersonsRoles')
export class MoviesPersonsRolesEntity {
  @PrimaryGeneratedColumn()
  movies_persons_roles_id: number;

  @ManyToOne(() => MoviesEntity, (movie) => movie.movie_id)
  @JoinColumn({ name: 'movie_id' })
  movie: MoviesEntity;

  @ManyToOne(() => PersonsEntity, (person) => person.person_id)
  @JoinColumn({ name: 'person_id' })
  person: PersonsEntity;

  @ManyToOne(() => RolesEntity, (role) => role.role_id)
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;
}
