import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CitiesService} from "./cities.service";
import {CreateCityDto} from "./dto/create-city.dto";
import {UpdateCityDto} from "./dto/update-city.dto";
import {City} from "./cities.model";

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
    constructor(private citiesService: CitiesService) {}

    @ApiOperation({summary: 'Create a new city'})
    @ApiResponse({status: 201, type: City})
    @Post()
    createCity(@Body() dto:CreateCityDto){
        return this.citiesService.createCity(dto)
    }

    @ApiOperation({summary: 'Get all cities'})
    @ApiResponse({status: 200, type: [City]})
    @Get()
    getAllCities(){
        return this.citiesService.getAllCities()
    }

    @ApiOperation({summary: 'Delete a city'})
    @ApiResponse({status: 201, type: "Deleted"})
    @Delete(':id')
    deleteCity(@Param('id') id:string){
        return this.citiesService.deleteCity(+id)
    }

    @ApiOperation({summary: 'Update a city'})
    @ApiResponse({status: 201, type: City})
    @Put()
    updateCity(@Body() dto:UpdateCityDto){
        return this.citiesService.updateCity(dto)
    }
}
