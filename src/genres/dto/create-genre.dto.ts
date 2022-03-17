import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class CreateGenreDto{
    @ApiProperty({example: 'Detective', description: 'Name of genre'})
    @IsString({message: "userId should be a string"})
    name:string
}