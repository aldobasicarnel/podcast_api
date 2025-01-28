import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PodcastModule } from "./podcast/podcast.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Podcast } from "./podcast/Entity/Podcast.entity";
import { UserModule } from './user/user.module';
import { User } from "./user/entity/user.entity";
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { EpisodesModule } from './episodes/episodes.module';
import { Episodes } from "./episodes/entity/Episodes.entity";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db.sqlite",
      entities: [Podcast, User, Episodes],
      synchronize: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PodcastModule,
    UserModule,
    AuthModule,
    EpisodesModule],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },]
})
export class AppModule {
}
