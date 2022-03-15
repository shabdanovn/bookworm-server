import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {UpdateUserDto} from "./dto/update-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'create a new user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() userDto: CreateUserDto){
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'get all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'get a user'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOneUser(@Param('id') id: string){
        return this.userService.getOneUser(+id)
    }

    @ApiOperation({summary: 'delete a user'})
    @ApiResponse({status: 200, type: 'id'})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(+id)
    }


    @ApiOperation({summary: 'update a user'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Put()
    updateUser(@Body() userDto: UpdateUserDto){
        return this.userService.updateUser(userDto)
    }

    @ApiOperation({summary: 'Attach a role to user'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.userService.addRole(dto)
    }

    @ApiOperation({summary: 'Ban a user'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto){
        return this.userService.banUser(dto)
    }
}
