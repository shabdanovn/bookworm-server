import { Module } from '@nestjs/common';
import { ReadingBooksController } from './reading-books.controller';
import { ReadingBooksService } from './reading-books.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { ReadingBook } from "./reading-books.model";
import { User } from "../users/users.model";
import { FilesModule } from "../files/files.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ReadingBooksController],
  providers: [ReadingBooksService],
  imports: [
    SequelizeModule.forFeature([ReadingBook, User]),
    FilesModule,
    AuthModule
  ]
})
export class ReadingBooksModule {}
