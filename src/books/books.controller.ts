import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {BooksService} from "./books.service";
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {Book} from "./books.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddGenreDto} from "./dto/add-genre.dto";
import { DeleteBookDto } from "./dto/delete-book.dto";

@ApiTags('Books')
@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService) {}

    @ApiOperation({summary: 'create a new book post'})
    @ApiResponse({status: 200, type: Book})
    @UseGuards(JwtAuthGuard)
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

    @ApiOperation({summary: 'Get user\'s books' })
    @ApiResponse({status:201, type: [Book]})
    @UseGuards(JwtAuthGuard)
    @Get('/my/:userId')
    getUsersBooks(@Param('userId') id: string){
        return this.bookService.getUsersBooks(+id)
    }

    @ApiOperation({summary: 'get books'})
    @ApiResponse({status: 200, type: [Book]})
    @Get()
    getAllBooks(){
        return this.bookService.getAllBooks()
    }

    @ApiOperation({summary: 'get searched books'})
    @ApiResponse({status: 200, type: [Book]})
    @Get('/search/:word')
    getSearchedBooks(@Param('word') word:string){
        return this.bookService.getSearchedBooks(word)
    }

    @ApiOperation({summary: 'get filtered books by genre'})
    @ApiResponse({status: 200, type: [Book]})
    @Get('/search/genre/:genre')
    getFilteredBooks(@Param('genre') word:string){
        return this.bookService.getFilteredBooks(word)
    }

    @ApiOperation({summary: 'delete a book post'})
    @ApiResponse({status: 200, type: Book})
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteBook(@Body() data: DeleteBookDto){
        this.bookService.deleteBook(data)
        return {message: "Book was deleted"}
    }

    @ApiOperation({summary: 'update a book post'})
    @ApiResponse({status: 200, type: Book})
    @UseGuards(JwtAuthGuard)
    @Put('/without-image')
    updateBook(@Body() dto: UpdateBookDto){
        return this.bookService.updateBook(dto)
    }

    @ApiOperation({summary: 'update a book post with image'})
    @ApiResponse({status: 200, type: Book})
    @UseGuards(JwtAuthGuard)
    @Put('/with-image')
    @UseInterceptors(FileInterceptor('img'))
    updateBookWithImage(@Body() dto: UpdateBookDto,
               @UploadedFile() img){
        return this.bookService.updateBookWithImage(dto, img)
    }

    @ApiOperation({summary: 'Attach a genre to user'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Post('/genre')
    addGenre(@Body() dto: AddGenreDto){
        return this.bookService.addGenre(dto)
    }


}
