import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {BooksService} from "./books.service";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {Book} from "./books.model";

@ApiTags('Books')
@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) {}

    @ApiOperation({summary: 'create a new book post'})
    @ApiResponse({status: 200, type: Book})
    @Post()
    @UseInterceptors(FileInterceptor('img'))
    createBook(@Body() dto: CreateBookDto,
               @UploadedFile() img){
        return this.bookService.createBook(dto, img)
    }

    @ApiOperation({summary: 'get a book post'})
    @ApiResponse({status: 200, type: Book})
    @Get(':id')
    getOneBook(@Param('id') id: string){
        return this.bookService.getOneBook(+id)
    }

    @ApiOperation({summary: 'get books'})
    @ApiResponse({status: 200, type: [Book]})
    @Get()
    getAllBooks(){
        return this.bookService.getAllBooks()
    }

    @ApiOperation({summary: 'delete a book post'})
    @ApiResponse({status: 200, type: Book})
    @Delete(':id')
    deleteBook(@Param('id') id: string){
        return this.bookService.deleteBook(+id)
    }

    @ApiOperation({summary: 'update a book post'})
    @ApiResponse({status: 200, type: Book})
    @Put('/without-image')
    updateBook(@Body() dto: UpdateBookDto){
        return this.bookService.updateBook(dto)
    }

    @ApiOperation({summary: 'update a book post with image'})
    @ApiResponse({status: 200, type: Book})
    @Put('/with-image')
    @UseInterceptors(FileInterceptor('img'))
    updateBookWithImage(@Body() dto: UpdateBookDto,
               @UploadedFile() img){
        return this.bookService.updateBookWithImage(dto, img)
    }
}
