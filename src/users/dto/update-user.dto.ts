import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString} from "class-validator";

export class UpdateUserDto{
    @ApiProperty({example: '1', description: 'ID of a user'})
    @IsNumber({}, {message: 'Id should be a number'})
    id:number

    @ApiProperty({example: 'densmith@gmail.com', description: 'Email of a user'})
    @IsString({message: "Email should be a string"})
    @IsEmail({}, {message: "Invalid email"})
    email: string

    @ApiProperty({example: 'densmith', description: 'Username of a user'})
    @IsString({message: "Username should be a string"})
    username: string

    @ApiProperty({example: 'Den Smith', description: 'Fullname of a user'})
    @IsString({message: "Full name should be a string"})
    fullname:string

    @ApiProperty({example: '1', description: 'CityID of a user'})
    @IsNumber({}, {message: "City Id should be a number"})
    cityId: number

    @ApiProperty({example: 'Bishkek', description: 'City of a user'})
        // @IsNumber({}, {message: "City Id should be a number"})
    cityName: string

    @ApiProperty({example: '+996700200222', description: 'Phone of a user'})
    @IsString({message: "Phone should be a string"})
    phone: string

    @ApiProperty({example: 'img', description: 'Image of a user'})
    img: string
}