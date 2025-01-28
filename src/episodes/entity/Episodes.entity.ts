import { Podcast } from "../../podcast/Entity/Podcast.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDateString, IsNumber, IsString, IsUUID } from "class-validator";

@Entity()
export class Episodes {

  @IsUUID()
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  description: string;

  @IsDateString()
  @Column()
  releaseDate: Date;

  @IsString()
  @Column()
  videoUrl: string;

  @IsNumber()
  @Column({default: 0})
  playCount: number;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodes, { onDelete: "CASCADE" })
  podcast: Podcast;

}

//    * id: Unique identifier
//     * podcastId: The podcast this episode belongs to
//     * title: Episode title
//     * description: Brief summary
//     * audioUrl: URL for the audio file
//     * duration: Duration of the episode
//     * releaseDate: Date when the episode was released
//     * playCount: Number of times this episode was played
