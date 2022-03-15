import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto{
    @ApiProperty({example: 'Admin', description:'Role of a user'})
    @IsString({message: "Role should be a string"})
    readonly name: string

    @ApiProperty({example: '1', description:'ID of a user'})
    @IsNumber({}, {message: "UserId should be a number"})
    readonly userId: number
}