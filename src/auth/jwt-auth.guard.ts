import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate{

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        try{
            const header = req.headers.authorization
            const bearer = header.split(' ')[0]
            const token = header.split(' ')[1]

            if(bearer !== 'Bearer' || !token)
                throw new UnauthorizedException('Not authorized')

            const user = this.jwtService.verify(token)
            req.user = user
            return true
        }catch (e){
            throw new UnauthorizedException('Not authorized')
        }

        return undefined;
    }

}