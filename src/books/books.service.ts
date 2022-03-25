import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Book} from "./books.model";
import {FilesService} from "../files/files.service";
import {Op} from "sequelize";
import {GenresService} from "../genres/genres.service";
import {AddGenreDto} from "./dto/add-genre.dto";
import { Genre } from "../genres/genres.model";

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book) private bookRepo: typeof Book,
                private filesService: FilesService,
                private genreService: GenresService) {}

    async createBook(dto: CreateBookDto, image: any){
        const fileName = await this.filesService.createFile(image)
        const book = await this.bookRepo.create({...dto, img: fileName})
        await book.$set('genres', [])
        await book.$set('comments', [])
        return book
    }

    async addGenre(dto: AddGenreDto) {
        const book = await this.bookRepo.findByPk(dto.bookId)
        const genre = await this.genreService.getGenreByName(dto.name)
        if(genre && book) {
            await book.$add('genre', genre.id)
            return dto
        }

        throw new HttpException('Book or genre not found', HttpStatus.NOT_FOUND )
    }

    async getOneBook(id: number){
        return await this.bookRepo.findByPk(id, {include: {all: true}})
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
                {title: {[Op.iLike]: `%${word}%`}},
                {author: {[Op.iLike]: `%${word}%`}}
            ]
        }})
    }

    async getFilteredBooks(word:string){
        const books = await this.bookRepo.findAll({include: {model: Genre}})
        const newBooks = []
        books.map(book => {
            book.genres.map(genre=> {
                if(genre.name.toLowerCase()===word.toLowerCase()) newBooks.push(book)
            })
        })
        return newBooks
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
