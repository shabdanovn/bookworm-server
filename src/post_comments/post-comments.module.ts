import { Module } from '@nestjs/common';
import { PostCommentsController } from './post-comments.controller';
import { PostCommentsService } from './post-comments.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Book} from "../books/books.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";
import { PostComment } from "./post-comments.model";

@Module({
  controllers: [PostCommentsController],
  providers: [PostCommentsService],
  imports: [
      SequelizeModule.forFeature([PostComment, User, Book]),
      UsersModule,
      AuthModule
  ]
})
export class PostCommentsModule {}
