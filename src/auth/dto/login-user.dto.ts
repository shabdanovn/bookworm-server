import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto{
    @ApiProperty({example: 'email@asd.com', description: 'Email'})
    readonly email:string

    @ApiProperty({example: '********', description: 'Password'})
    readonly password: string
}