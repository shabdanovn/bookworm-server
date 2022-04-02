import { Body, Get, HttpException, HttpStatus, Injectable, Param, Post, Put } from "@nestjs/common";
import { CreateSavedBooksDto } from "./dto/create-saved-books.dto";
import { InjectModel } from "@nestjs/sequelize";
import { SavedBooks } from "./saved-books.model";
import { annotateModelWithIndex } from "sequelize-typescript";
import { BooksService } from "../books/books.service";
import { DeleteSavedBooksDto } from "./dto/delete-saved-books.dto";
import { Op } from "sequelize";

@Injectable()
export class SavedBooksService {

  constructor(@InjectModel(SavedBooks) private savedBookRepo: typeof SavedBooks,
              private bookService: BooksService) {}

  async addSavedBooks(dto: CreateSavedBooksDto){
    return await this.savedBookRepo.create(dto)

  }

  async getUsersSavedBooks(id: number){
    const usersSavedBooksIds = await this.savedBookRepo.findAll({where: {userId: id}})
    const array = usersSavedBooksIds.map(item => item.bookId)
    return await this.bookService.getSavedBooks(array)
  }

  async removeFromSavedBooks(dto: DeleteSavedBooksDto){
    try{
      return await this.savedBookRepo.destroy({where: {
          [Op.and]: [
            {userId: dto.userId},
            {bookId: dto.bookId}
          ]
        }})
    }catch (e) {
      throw new HttpException("No saved was found", HttpStatus.NOT_FOUND)
    }
  }
}
