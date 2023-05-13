import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentsEntity } from './comments.entity';
import { FriendsEntity } from './friends.entity';
import { UserMoviesInfoEntity } from './user-movies-info.entity';

@Entity('Users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  user_name: string;

  @Column({ nullable: true })
  community: string;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  external_service_id: string;

  @Column({ nullable: true })
  quote: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ default: null, nullable: true })
  refresh_token: string;

  @Column({ default: false })
  is_eng: boolean;

  @OneToMany(() => CommentsEntity, (comment) => comment.user)
  @JoinTable()
  comments: CommentsEntity[];

  @ManyToOne(() => FriendsEntity, (friend) => friend.friends_id)
  @JoinColumn({ name: 'friends_id' })
  friends: FriendsEntity[];

  @OneToOne(() => UserMoviesInfoEntity, (usermovie) => usermovie.user)
  @JoinColumn({ name: 'user_movie_info_id' })
  user_movies_info: UserMoviesInfoEntity;
}
