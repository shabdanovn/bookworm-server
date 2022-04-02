import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SavedBooksService } from "./saved-books.service";
import { CreateSavedBooksDto } from "./dto/create-saved-books.dto";
import { DeleteSavedBooksDto } from "./dto/delete-saved-books.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SavedBooks } from "./saved-books.model";
import { Book } from "../books/books.model";

@ApiTags('Saved Books')
@Controller('saved-books')
export class SavedBooksController {

  constructor(private savedBookService: SavedBooksService) {}

  @ApiOperation({summary: 'Saving a book'})
  @ApiResponse({status: 201, type: SavedBooks})
  @Post()
  addSavedBooks(@Body() dto: CreateSavedBooksDto){
    return this.savedBookService.addSavedBooks(dto)
  }

  @ApiOperation({summary: 'Getting all saved books of a user'})
  @ApiResponse({status: 201, type: [Book]})
  @Get(':userId')
  getUsersSavedBooks(@Param('userId') id: string){
    return this.savedBookService.getUsersSavedBooks(+id)
  }

  @ApiOperation({summary: 'Removing saved book'})
  @ApiResponse({status: 200, type: SavedBooks})
  @Delete()
  removeFromSavedBooks(@Body() dto: DeleteSavedBooksDto){
    return this.savedBookService.removeFromSavedBooks(dto)
  }
}
