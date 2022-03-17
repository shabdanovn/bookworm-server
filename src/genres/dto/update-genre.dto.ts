import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateGenreDto{
    @ApiProperty({example: '1', description: 'ID of genre'})
    id:number

    @ApiProperty({example: 'Detective', description: 'Name of genre'})
    @IsString({message: "userId should be a string"})
    name:string
}