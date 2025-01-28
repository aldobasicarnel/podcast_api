import { Module } from "@nestjs/common";
import { EpisodesController } from "./episodes.controller";
import { EpisodesService } from "./episodes.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Episodes } from "./entity/Episodes.entity";
import { Podcast } from "../podcast/Entity/Podcast.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Episodes, Podcast])],
  controllers: [EpisodesController],
  providers: [EpisodesService]
})
export class EpisodesModule {
}
