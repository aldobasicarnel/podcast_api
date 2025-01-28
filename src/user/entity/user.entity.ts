import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import { Podcast } from "../../podcast/Entity/Podcast.entity";
import { Exclude } from "class-transformer";
import { IsEmail, IsString, IsUUID } from "class-validator";

@Entity()
export class User {

  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsString()
  @Column()
  nickname: string;

  @IsString()
  @Column()
  firstName: string;

  @IsString()
  @Column()
  lastName: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Podcast, (podcast) => podcast.host)
  podcast: Podcast;

  @ManyToMany(() => Podcast, (podcast) => podcast.subscribers)
  subscribedPodcasts: Podcast[];
}
