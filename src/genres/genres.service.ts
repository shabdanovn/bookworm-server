import {Injectable} from '@nestjs/common';
import {CreateGenreDto} from "./dto/create-genre.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Genre} from "./genres.model";
import {UpdateGenreDto} from "./dto/update-genre.dto";

@Injectable()
export class GenresService {

    constructor(@InjectModel(Genre) private genreRepo: typeof Genre) {
    }

    async createGenre(dto: CreateGenreDto){
        return await this.genreRepo.create(dto)
    }

    async getGenreByName(name: string){
        return await this.genreRepo.findOne({where: {name}})
    }

    async getAllGenres(){
        return await this.genreRepo.findAll()
    }

    async deleteGenre(id:number){
        await this.genreRepo.destroy({where: {id}})
        return `Genre with id: ${id} was deleted`
    }

    async updateGenre(dto: UpdateGenreDto){
        return await this.genreRepo.update(dto, {where: {id: dto.id}})
    }
}
