import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreatePodcastDto } from "./dtos/CreatePodcast.dto";
import { PodcastService } from "./podcast.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../auth/getUser.decorator";
import { EditPodcastDto } from "./dtos/EditPodcast.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("podcasts")
export class PodcastController {

  constructor(private podcastService: PodcastService) {
  }

  @Get()
  findAll(@Query("sortDirection") sortDirection: "asc" | "desc" = "asc") {
    return this.podcastService.findAll(sortDirection);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.podcastService.findOne(id);
  }

  @Post()
  createPodcast(
    @Body() createPodcastDto: CreatePodcastDto,
    @GetUser("userId") userId: string
  ) {
    return this.podcastService.createPodcast(createPodcastDto, userId);
  }

  @Delete(":id")
  removePodcast(@Param("id") id: string) {
    return this.podcastService.removePodcast(id);
  }

  @Put(":id")
  updatePodcast(
    @Param("id") id: string,
    @Body() editPodcastDto: EditPodcastDto
  ) {
    return this.podcastService.updatePodcast(id, editPodcastDto);
  }

  @Post("/subscribe/:id")
  subscribeToPodcast(
    @Param("id") podcastId: string,
    @GetUser('userId') userId: string
  ) {
    return this.podcastService.subscribeToPodcast(podcastId, userId);
  }

  @Post("/unsubscribe/:id")
  unsubscribeFromPodcast(
    @Param("id") podcastId: string,
    @GetUser("userId") userId: string
  ) {
    console.log(podcastId, userId, "IDS");
    return this.podcastService.unsubscribeFromPodcast(podcastId, userId);
  }
}
