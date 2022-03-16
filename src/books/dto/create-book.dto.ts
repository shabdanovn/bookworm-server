import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateBookDto{
    @ApiProperty({example: 'Godfather', description: 'Title of book'})
    @IsString({message: "Title should be a string"})
    readonly title: string

    @ApiProperty({example: 'Coelho', description: 'Author of book'})
    @IsString({message: "author should be a string"})
    readonly author: string

    @ApiProperty({example: 'New book', description: 'Notes to a book'})
    @IsString({message: "notes should be a string"})
    readonly notes: string

    @ApiProperty({example: 'Image', description: 'Image of book'})
    readonly img: string

    @ApiProperty({example: '250 som', description: 'Cost of book'})
    @IsString({message: "cost should be a string"})
    readonly cost: string

    @ApiProperty({example: 'Free', description: 'Conditions of book'})
    @IsString({message: "conditions should be a string"})
    readonly conditions: string

    @ApiProperty({example: '8', description: 'State of book'})
    @IsString({message: "state should be a string"})
    readonly state: string

    @ApiProperty({example: '1', description: 'Owner of book'})
    @IsString({message: "userId should be a string"})
    readonly userId: number
}