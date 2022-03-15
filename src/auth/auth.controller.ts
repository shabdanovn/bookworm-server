import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authservice: AuthService) {}


    @Post('/login')
    login(@Body() dto: LoginUserDto){
        return this.authservice.login(dto)
    }

    @Post('/register')
    register(@Body() dto: CreateUserDto){
        return this.authservice.register(dto)
    }

}
