import {Body, Delete, Get, Injectable, Param, Put} from '@nestjs/common';
import {CreateCityDto} from "./dto/create-city.dto";
import {UpdateCityDto} from "./dto/update-city.dto";
import {InjectModel} from "@nestjs/sequelize";
import {City} from "./cities.model";
import {where} from "sequelize";

@Injectable()
export class CitiesService {

    constructor(@InjectModel(City) private cityRepo: typeof City) {}

    async createCity(dto:CreateCityDto){
        return await this.cityRepo.create(dto)
    }

    async getAllCities(){
        return await this.cityRepo.findAll()
    }

    async getCity(id:number){
        return await this.cityRepo.findByPk(id)
    }

    async deleteCity(id:number){
        await this.cityRepo.destroy({where: {id}})
        return `city with id ${id} was deleted`
    }

    async updateCity(dto:UpdateCityDto){
        return await this.cityRepo.update(dto, {where: {id: dto.id}})
    }

    async getIdByName(name: string){
        const [city, _] = await this.cityRepo.findOrCreate({where: {name}, defaults: {name}})
        return city.id
    }
}
