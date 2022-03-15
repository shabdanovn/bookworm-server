import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async login(dto: LoginUserDto){
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async register(dto: CreateUserDto){
        const candidate = await this.usersService.getUserByEmail(dto.email)
        if(candidate)
            throw new HttpException('There is a user with this email', HttpStatus.BAD_REQUEST)
        const hashedPassword = await bcrypt.hash(dto.password, 7)
        const user = await this.usersService.createUser({...dto, password: hashedPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const paylaod = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(paylaod)
        }
    }


    private async validateUser(user: LoginUserDto) {
        const candidate = await this.usersService.getUserByEmail(user.email)
        const passwordEquals = await bcrypt.compare(user.password, candidate.password)
        if(candidate && passwordEquals)
            return candidate
        throw new UnauthorizedException({message: 'Invalid login or password'})

    }
}
