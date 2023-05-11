import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { PersonsEntity } from './persons.entity';

@Entity('Roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column()
  name: string;

  @Column({ default: false })
  is_eng: boolean;

  @ManyToMany(() => PersonsEntity, (person) => person.roles)
  persons: PersonsEntity[];
}
