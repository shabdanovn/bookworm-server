import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepo: typeof User) {}

    async createUser(user: CreateUserDto) {
        return await this.userRepo.create(user)
    }

    async getAllUsers() {
        return await this.userRepo.findAll()
    }

    async getOneUser(id:number) {
        return await this.userRepo.findOne({where: {id}})
    }

    async deleteUser(id: number) {
        await this.userRepo.destroy({where: {id}})
        return 'User was deleted'
    }

    async updateUser(dto: CreateUserDto){
        // await this.userRepo.update({where: {id: dto.}})
    }
}
