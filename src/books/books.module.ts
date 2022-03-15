import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Book} from "./books.model";
import {User} from "../users/users.model";
import {FilesModule} from "../files/files.module";

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
      SequelizeModule.forFeature([Book, User]),
      FilesModule
  ]
})
export class BooksModule {}
