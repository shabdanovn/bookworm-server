import {forwardRef, Module} from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Genre} from "./genres.model";
import {Book} from "../books/books.model";
import {GenreBooks} from "./genre-books.model";

@Module({
  providers: [GenresService],
  controllers: [GenresController],
  imports: [
      SequelizeModule.forFeature([Genre, Book, GenreBooks])
  ],
    exports:[
        GenresService
    ]
})
export class GenresModule {}
