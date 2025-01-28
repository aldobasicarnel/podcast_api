import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Podcast } from "./Entity/Podcast.entity";
import { CreatePodcastDto } from "./dtos/CreatePodcast.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entity/user.entity";
import { EditPodcastDto } from "./dtos/EditPodcast.dto";


@Injectable()
export class PodcastService {

  constructor(@InjectRepository(Podcast) private podcastRepository: Repository<Podcast>,
              @InjectRepository(User) private userRepo: Repository<User>) {
  }

  async findAll(sortDirection: "asc" | "desc" = "asc") {
    const podcasts = await this.podcastRepository.find({
      order: { name: sortDirection },
      relations: ["subscribers", "episodes"]
    });
    return podcasts;
  }

  async findOne(id: string) {
    const podcast = this.podcastRepository.findOne({ where: { id: id }, relations: ["subscribers", "episodes"] });

    if (!podcast) {
      throw new NotFoundException(`Podcast with ${id} not found`);
    }

    return podcast;
  }

  async createPodcast(createPodcastDto: CreatePodcastDto, userId: string) {

    console.log(userId);
    const host = await this.userRepo.findOne({ where: { id: userId } });

    if (!host) {
      throw new NotFoundException(`User with ${userId} not found`);
    }

    const newPodcast = this.podcastRepository.create({ ...createPodcastDto, id: uuidv4(), host });

    return this.podcastRepository.save(newPodcast);

  }

  async removePodcast(id: string) {
    const episode = this.podcastRepository.findOneBy({ id: id });

    if (!episode) {
      throw new NotFoundException(`Podcast with ID ${id} not found`);
    }

    await this.podcastRepository.delete({ id: id });

    return `Removed podcast with ${id} from list.`;
  }

  async updatePodcast(id: string, editPodcastDto: EditPodcastDto) {
    const podcast = await this.podcastRepository.findOneBy({ id });

    if (!podcast) {
      throw new NotFoundException(`Podcast with ${id} not found!`);
    }

    Object.assign(podcast, editPodcastDto);

    return await this.podcastRepository.save(podcast);

  }

  async subscribeToPodcast(podcastId: string, userId: string) {
    console.log(userId, "USER ID IN SUBSCRIBE LOGIC SERVICE");
    const podcast = await this.podcastRepository.findOne({ where: { id: podcastId }, relations: ["subscribers"] });

    console.log(podcast);

    if (!podcast) {
      throw new NotFoundException(`Podcast with ${podcastId} not found!`);
    }

    const subscribedUser = await this.userRepo.findOne({ where: { id: userId } });

    if (!subscribedUser) {
      throw new NotFoundException(`User with ID ${userId} not found!`);
    }

    const isAlreadySubscribed = podcast.subscribers.some((user) => userId === user.id);

    console.log(isAlreadySubscribed, "IS USER SUBSCRIBED");

    if (isAlreadySubscribed) {
      throw new NotFoundException(`User with ID ${userId} is already subscribed to this podcast.`);
    }

    podcast.subscribers.push(subscribedUser);

    console.log(podcast, "New podcast with subsribers");

    return await this.podcastRepository.save(podcast);

  }

  async unsubscribeFromPodcast(podcastId: string, userId: string) {
    console.log(userId);
    const podcast = await this.podcastRepository.findOne({ where: { id: podcastId }, relations: ["subscribers"] });

    if (!podcast) {
      throw new NotFoundException(`Podcast with ${podcastId} not found!`);
    }

    const subscribedUser = await this.userRepo.findOne({ where: { id: userId } });

    if (!subscribedUser) {
      throw new NotFoundException(`User with ID ${userId} not found!`);
    }

    const isSubscribed = podcast.subscribers.some(
      (user) => user.id === userId
    );

    if (!isSubscribed) {
      throw new Error(`User with ID ${userId} is not subscribed to this podcast.`);
    }

    podcast.subscribers = podcast.subscribers.filter((user) => user.id !== userId);

    return await this.podcastRepository.save(podcast);

  }

}
