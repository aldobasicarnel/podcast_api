import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Episodes } from "./entity/Episodes.entity";
import { Repository } from "typeorm";
import { CreateEpisodeDto } from "./dtos/CreateEpisode.dto";
import { Podcast } from "../podcast/Entity/Podcast.entity";
import { EditEpisodeDto } from "./dtos/EditEpisode.dto";

@Injectable()
export class EpisodesService {

  constructor(
    @InjectRepository(Podcast) private podcastRepo: Repository<Podcast>,
    @InjectRepository(Episodes) private episodesRepo: Repository<Episodes>
  ) {
  }

  async findAll() {
    const episodes = await this.episodesRepo.find();

    if (!episodes) {
      return [];
    }

    return episodes;

  }

  async findOne(id: string) {
    return await this.episodesRepo.findOneBy({ id });
  }

  async createEpisode(podcastId: string, createEpisodeDto: CreateEpisodeDto) {

    if (!podcastId) {
      throw new BadRequestException("Param not provided");
    }

    const podcast = await this.podcastRepo.findOne({ where: { id: podcastId } });

    if (!podcast) {
      throw new NotFoundException(`Podcast with ${podcastId} not found in DB!`);
    }

    const newEpisode = this.episodesRepo.create({ ...createEpisodeDto, podcast });

    return await this.episodesRepo.save(newEpisode);
  }

  async removeEpisode (id: string) {
    const episode = await this.episodesRepo.findOneBy({id});

    if (!episode) {
      throw new NotFoundException(`Episode with ${id} not found`);
    }

    await this.episodesRepo.delete(episode);

    return `Episode with ${id} successfully removed.`;
  }

  async updateEpisode (id: string, editEpisodeDto: EditEpisodeDto) {
    const episode = await this.episodesRepo.findOneBy({id});

    if (!episode) {
      throw new NotFoundException(`Episode with ${id} not found!`);
    }

    Object.assign(episode, editEpisodeDto);

    return await this.episodesRepo.save(episode);
  }
}
