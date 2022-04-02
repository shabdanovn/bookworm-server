import { Module } from '@nestjs/common';
import { SavedBooksService } from './saved-books.service';
import { SavedBooksController } from './saved-books.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { SavedBooks } from "./saved-books.model";
import { UsersModule } from "../users/users.module";
import { User } from "../users/users.model";
import { BooksModule } from "../books/books.module";

@Module({
  providers: [SavedBooksService],
  controllers: [SavedBooksController],
  imports: [
    SequelizeModule.forFeature([SavedBooks, User]),
    UsersModule,
    BooksModule
  ],
  exports: [
    SavedBooksService
  ]
})
export class SavedBooksModule {}
