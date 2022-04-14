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
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { ReadingBooksService } from "./reading-books.service";
import { ReadingBook } from "./reading-books.model";
import { CreateReadingBooksDto } from "./dto/create-reading-books.dto";
import { UpdateReadingBooksDto } from "./dto/update-reading-books.dto";


@ApiTags('Redaing books')
@Controller('reading-books')
export class ReadingBooksController {
  constructor(private readingBookService: ReadingBooksService) {}

  @ApiOperation({summary: 'create a reading book'})
  @ApiResponse({status: 200, type: ReadingBook})
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  createBook(@Body() dto: CreateReadingBooksDto,
             @UploadedFile() img){
    return this.readingBookService.createBook(dto, img)
  }

  @ApiOperation({summary: 'Get user\'s reading books' })
  @ApiResponse({status:200, type: [ReadingBook]})
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getUsersBooks(@Param('userId') id: string){
    return this.readingBookService.getUsersBooks(+id)
  }

  @ApiOperation({summary: 'delete a reading book'})
  @ApiResponse({status: 200, type: ReadingBook})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBook(@Param('id') id:string){
    this.readingBookService.deleteBook(+id)
    return {message: "Book was deleted"}
  }

  @ApiOperation({summary: 'update a book post'})
  @ApiResponse({status: 200, type: ReadingBook})
  @UseGuards(JwtAuthGuard)
  @Put('/without-image')
  updateBook(@Body() dto: UpdateReadingBooksDto){
    return this.readingBookService.updateBook(dto)
  }

  @ApiOperation({summary: 'update a book post with image'})
  @ApiResponse({status: 200, type: ReadingBook})
  @UseGuards(JwtAuthGuard)
  @Put('/with-image')
  @UseInterceptors(FileInterceptor('img'))
  updateBookWithImage(@Body() dto: UpdateReadingBooksDto,
                      @UploadedFile() img){
    return this.readingBookService.updateBookWithImage(dto, img)
  }
}
