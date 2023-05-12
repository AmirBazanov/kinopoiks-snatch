import { Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from './users.entity';

@Entity('Friends')
export class FriendsEntity {
  @PrimaryGeneratedColumn()
  friends_id: string;

  @OneToMany(() => UsersEntity, (user) => user.friends)
  @JoinTable()
  friend: UsersEntity[];
}
