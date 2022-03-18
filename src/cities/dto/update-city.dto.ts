import {ApiProperty} from "@nestjs/swagger";

export class UpdateCityDto{
    @ApiProperty({example: '1', description: 'id of a city'})
    id: number
    @ApiProperty({example: 'Bishkek', description: 'Name of a city'})
    readonly name: string
}