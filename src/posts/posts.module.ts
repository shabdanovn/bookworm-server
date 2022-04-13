import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { PostModel } from "./posts.model";
import { User } from "../users/users.model";
import { FilesModule } from "../files/files.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([PostModel, User]),
    FilesModule,
    AuthModule
  ],
  exports: [
    PostsService
  ]
})
export class PostsModule {}
