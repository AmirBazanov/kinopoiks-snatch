import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MoviesEntity } from "./movies.entity";
import { UsersEntity } from "./users.entity";
import { JoinColumn } from "typeorm";

@Entity("Comments")
export class CommentsEntity{
  @PrimaryGeneratedColumn()
  comment_id: number

  @Column()
  title: string

  @Column()
  likes: number

  @Column()
  dislikes: number

  @Column()
  replied_comment: number

  @ManyToOne(()=>MoviesEntity, movie=>movie.comments)
  @JoinColumn({name: 'movie_id'})
  movie: MoviesEntity

  @ManyToOne(()=>UsersEntity, user=>user.comments)
  @JoinColumn({name: 'user_id'})
  user: UsersEntity

  @Column()
  is_eng: boolean
}
