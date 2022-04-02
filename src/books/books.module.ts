import {forwardRef, Module} from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Book} from "./books.model";
import {User} from "../users/users.model";
import {FilesModule} from "../files/files.module";
import {Genre} from "../genres/genres.model";
import {GenreBooks} from "../genres/genre-books.model";
import {GenresModule} from "../genres/genres.module";
import {AuthModule} from "../auth/auth.module";
import { CitiesModule } from "../cities/cities.module";

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [
      SequelizeModule.forFeature([Book, User, Genre, GenreBooks]),
      FilesModule,
      GenresModule,
      AuthModule,
      CitiesModule
  ],
  exports: [
    BooksService
  ]
})
export class BooksModule {}
