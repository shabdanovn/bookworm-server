import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from "@nestjs/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateGenreDto} from "./dto/create-genre.dto";
import {GenresService} from "./genres.service";
import {UpdateGenreDto} from "./dto/update-genre.dto";
import {Genre} from "./genres.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Genres")
@Controller('genres')
export class GenresController {

    constructor(private genreService: GenresService) {}

    @ApiOperation({summary: 'Create a new genre'})
    @ApiResponse({status: 201, type: Genre})
    @UseGuards(JwtAuthGuard)
    @Post()
    createGenre(@Body() dto: CreateGenreDto){
        return this.genreService.createGenre(dto)
    }

    @ApiOperation({summary: 'Get all genres'})
    @ApiResponse({status: 201, type: [Genre]})
    @Get()
    getAllGenres(){
        return this.genreService.getAllGenres()
    }

    @ApiOperation({summary: 'Delete a genre'})
    @ApiResponse({status: 201})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteGenre(@Param('id') id:string){
        return this.genreService.deleteGenre(+id)
    }

    @ApiOperation({summary: 'Update a genre'})
    @ApiResponse({status: 201, type: Genre})
    @UseGuards(JwtAuthGuard)
    @Put()
    updateGenre(@Body() dto: UpdateGenreDto){
        return this.genreService.updateGenre(dto)
    }
}
