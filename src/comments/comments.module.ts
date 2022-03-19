import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Comment} from "./comments.model";
import {User} from "../users/users.model";
import {Book} from "../books/books.model";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
      SequelizeModule.forFeature([Comment, User, Book]),
      UsersModule,
      AuthModule
  ]
})
export class CommentsModule {}
