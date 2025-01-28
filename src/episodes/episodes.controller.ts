import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { EpisodesService } from "./episodes.service";
import { AuthGuard } from "@nestjs/passport";
import { CreateEpisodeDto } from "./dtos/CreateEpisode.dto";
import { EditEpisodeDto } from "./dtos/EditEpisode.dto";

@UseGuards(AuthGuard("jwt"))
@Controller("episodes")
export class EpisodesController {

  constructor(private episodesService: EpisodesService) {
  }

  @Get()
  findAll() {
    return this.episodesService.findAll();
  }

  @Get(":id")
  findOne (@Param("id") id: string) {
    return this.episodesService.findOne(id);
  }

  @Post(":podcastId")
  createEpisode(
    @Param("podcastId") podcastId: string,
    @Body() createEpisodeDto: CreateEpisodeDto
  ) {
    return this.episodesService.createEpisode(podcastId, createEpisodeDto);
  }

  @Delete(":id")
  removeEpisode (@Param("id") id: string) {
    return this.episodesService.removeEpisode(id);
  }

  @Put(":id")
  updateEpisode(@Param("id") id: string, @Body() editEpisodeDto: EditEpisodeDto) {
    return this.episodesService.updateEpisode(id, editEpisodeDto);
  }



}
