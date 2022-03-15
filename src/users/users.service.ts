import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {RolesService} from "../roles/roles.service";
import {BanUserDto} from "./dto/ban-user.dto";
import {AddRoleDto} from "./dto/add-role.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepo: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepo.create(dto)
        const role = await this.roleService.getRoleByName('User')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        return await this.userRepo.findAll({include: {all: true}})
    }

    async getOneUser(id:number) {
        return await this.userRepo.findOne({where: {id}})
    }

    async deleteUser(id: number) {
        await this.userRepo.destroy({where: {id}})
        return 'User was deleted'
    }

    async updateUser(dto: UpdateUserDto){
        const user = await this.userRepo.update(dto, {where: {id:dto.id}})
        return user
    }

    async getUserByEmail(email: string){
        return await this.userRepo.findOne({where: {email}, include:{all: true}})
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepo.findByPk(dto.userId)
        const role = await this.roleService.getRoleByName(dto.name)
        if(user && role) {
            await user.$add('role', role.id)
            return dto
        }

        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND )
    }

    async banUser(dto: BanUserDto) {

    }

}

