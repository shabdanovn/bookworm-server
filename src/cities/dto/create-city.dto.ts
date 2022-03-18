import {ApiProperty} from "@nestjs/swagger";

export class CreateCityDto{
    @ApiProperty({example: 'Bishkek', description: 'Name of a city'})
    readonly name: string
}