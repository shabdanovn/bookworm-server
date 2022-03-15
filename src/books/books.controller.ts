import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {BooksService} from "./books.service";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";

@ApiTags('Books')
@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) {}

    @Post()
    @UseInterceptors(FileInterceptor('img'))
    createBook(@Body() dto: CreateBookDto,
               @UploadedFile() img){
        return this.bookService.createBook(dto, img)
    }

    @Get('/:id')
    getOneBook(@Param('id') id: string){
        return this.bookService.getOneBook(+id)
    }

    @Get()
    getAllBooks(){
        return this.bookService.getAllBooks()
    }

    @Delete('/:id')
    deleteBook(@Param('id') id: string){
        return this.bookService.deleteBook(+id)
    }

    @Put()
    @UseInterceptors(FileInterceptor('img'))
    updateBook(@Body() dto: UpdateBookDto,
               @UploadedFile() img){
        return this.bookService.updateBook(dto, img)
    }
}
