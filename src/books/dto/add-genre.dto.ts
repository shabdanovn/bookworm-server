import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddGenreDto{
    @ApiProperty({example: 'Detective', description:'Genre of a user'})
    @IsString({message: "Genre should be a string"})
    readonly name: string

    @ApiProperty({example: '1', description:'ID of a books'})
    @IsNumber({}, {message: "BookId should be a number"})
    readonly bookId: number
}