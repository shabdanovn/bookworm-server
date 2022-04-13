import { Module } from '@nestjs/common';
import { SavedPostsService } from './saved-posts.service';
import { SavedPostsController } from './saved-posts.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { SavedPosts } from "./saved-posts.model";
import { UsersModule } from "../users/users.module";
import { User } from "../users/users.model";
import { PostsModule } from "../posts/posts.module";

@Module({
  providers: [SavedPostsService],
  controllers: [SavedPostsController],
  imports: [
    SequelizeModule.forFeature([SavedPosts, User]),
    UsersModule,
    PostsModule
  ],
  exports: [
    SavedPostsService
  ]
})
export class SavedPostsModule {}
