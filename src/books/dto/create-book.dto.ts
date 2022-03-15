import {ApiProperty} from "@nestjs/swagger";

export class CreateBookDto{
    @ApiProperty({example: 'Godfather', description: 'Title of book'})
    readonly title: string

    @ApiProperty({example: 'Coelho', description: 'Author of book'})
    readonly author: string

    @ApiProperty({example: 'New book', description: 'Notes to a book'})
    readonly notes: string

    @ApiProperty({example: 'Image', description: 'Image of book'})
    readonly img: string

    @ApiProperty({example: '250 som', description: 'Cost of book'})
    readonly cost: string

    @ApiProperty({example: 'Free', description: 'Conditions of book'})
    readonly conditions: string

    @ApiProperty({example: '8', description: 'State of book'})
    readonly state: string

    @ApiProperty({example: '1', description: 'Owner of book'})
    readonly userId: number
}