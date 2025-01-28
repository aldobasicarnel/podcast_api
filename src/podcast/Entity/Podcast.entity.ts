import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable
} from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Episodes } from "../../episodes/entity/Episodes.entity";

@Entity()
export class Podcast {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.podcast, { eager: true, onDelete: "CASCADE" })
  host: User;

  @ManyToMany(() => User, (user) => user.subscribedPodcasts, {onDelete: "CASCADE"})
  @JoinTable()
  subscribers: User[];

  @Column()
  coverImage: string;

  @Column()
  category: string;

  @Column({ default: 0 })
  followers: number;

  @OneToMany(() => Episodes, (episode) => episode.podcast, { cascade: true })
  episodes: Episodes[];

}
