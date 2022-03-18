import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsString, Length} from "class-validator";

export class CreateUserDto{
    @ApiProperty({example: 'densmith@gmail.com', description: 'Email of a user'})
    @IsString({message: "Email should be a string"})
    @IsEmail({}, {message: "Invalid email"})
    email: string

    @ApiProperty({example: '********', description: 'Password of a user'})
    @IsString({message: "Password should be a string"})
    @Length(8, 16, {message: "Password syntax is incorrect"})
    password: string

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
}