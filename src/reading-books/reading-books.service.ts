import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "../files/files.service";
import { ReadingBook } from "./reading-books.model";
import { CreateReadingBooksDto } from "./dto/create-reading-books.dto";
import { UpdateReadingBooksDto } from "./dto/update-reading-books.dto";

@Injectable()
export class ReadingBooksService {
  constructor(@InjectModel(ReadingBook) private readBookRepo: typeof ReadingBook,
              private filesService: FilesService) {}

  async createBook(dto: CreateReadingBooksDto, image: any){
    const fileName = await this.filesService.createFile(image)
    return await this.readBookRepo.create({...dto, img: fileName})
  }


  async getUsersBooks(id:number){
    if(id) return await this.readBookRepo.findAll({where: {userId: id}})
    throw new HttpException('User id is not valid', HttpStatus.BAD_REQUEST)
  }


  async deleteBook(id:number){
    try{
      return await this.readBookRepo.destroy({where: {id}})
    }catch (e) {
      throw new HttpException("No user or book was found", HttpStatus.NOT_FOUND)
    }
  }

  async updateBook(dto: UpdateReadingBooksDto){
    return await this.readBookRepo.update(dto, {where: {id:dto.id}})
  }

  async updateBookWithImage(dto: UpdateReadingBooksDto, img:any){
    const fileName = await this.filesService.createFile(img)
    return await this.readBookRepo.update({...dto, img:fileName}, {where: {id: dto.id}})
  }
}
