import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example: 'densmith@gmail.com', description: 'Email of a user'})
    email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    password: string

    @ApiProperty({example: 'densmith', description: 'Username of a user'})
    username: string

    @ApiProperty({example: 'Den Smith', description: 'Fullname of a user'})
    fullname:string

    @ApiProperty({example: '1', description: 'CityID of a user'})
    cityId: number

    @ApiProperty({example: '+996700200222', description: 'Phone of a user'})
    phone: string
}