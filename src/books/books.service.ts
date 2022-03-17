import {Body, Delete, Get, Injectable, Param, Put} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Book} from "./books.model";
import {FilesService} from "../files/files.service";
import {Op} from "sequelize";

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book) private bookRepo: typeof Book,
                private filesService: FilesService) {}

    async createBook(dto: CreateBookDto, image: any){
        const fileName = await this.filesService.createFile(image)
        const book = await this.bookRepo.create({...dto, img: fileName})
        return book
    }

    async getOneBook(id: number){
        return await this.bookRepo.findByPk(id)
    }

    async getAllBooks(){
        return await this.bookRepo.findAll()
    }

    async getSearchedBooks(word:string){
        word = word.toLowerCase()
        let string = word.split('')[0].toUpperCase()
        word = string+word.substring(1)
        return await this.bookRepo.findAll({where:{
            [Op.or]: [
                {title: {[Op.substring]: word}},
                {author: {[Op.substring]: word}}
            ]
        }})
    }

    async deleteBook(id: number){
        return await this.bookRepo.destroy({where: {id}})
    }

    async updateBook(dto: UpdateBookDto){
        return await this.bookRepo.update(dto, {where: {id:dto.id}})
    }

    async updateBookWithImage(dto: UpdateBookDto, img:any){
        const fileName = await this.filesService.createFile(img)
        return await this.bookRepo.update({...dto, img:fileName}, {where: {id: dto.id}})
    }
}
