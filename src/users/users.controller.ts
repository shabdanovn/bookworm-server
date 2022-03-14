import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";

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
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'get a user'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    getOneUser(@Param('id') id: string){
        return this.userService.getOneUser(+id)
    }

    @ApiOperation({summary: 'delete a user'})
    @ApiResponse({status: 200, type: 'id'})
    @Delete(':id')
    deleteUser(@Param('id') id: string){
        return this.userService.deleteUser(+id)
    }


    @ApiOperation({summary: 'update a user'})
    @ApiResponse({status: 200, type: User})
    @Put()
    updateUser(@Body() userDto: CreateUserDto){
        return this.userService.updateUser(userDto)
    }
}
