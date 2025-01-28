import { Module } from "@nestjs/common";
import { PodcastController } from "./podcast.controller";
import { PodcastService } from "./podcast.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Podcast } from "./Entity/Podcast.entity";
import { User } from "../user/entity/user.entity";
import { Episodes } from "../episodes/entity/Episodes.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, User, Episodes])],
  controllers: [PodcastController],
  providers: [PodcastService]
})
export class PodcastModule {
}
