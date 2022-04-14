import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateReadingBooksDto{
  @ApiProperty({example: '1', description: 'Id of book'})
  id:number

  @ApiProperty({example: 'Godfather', description: 'Title of book'})
  @IsString({message: "Title should be a string"})
  readonly title: string

  @ApiProperty({example: 'Coelho', description: 'Author of book'})
  @IsString({message: "author should be a string"})
  readonly author: string

  @ApiProperty({example: 'Detective', description: 'Genre to a book'})
  @IsString({message: "notes should be a string"})
  readonly genre: string

  @ApiProperty({example: 'Image', description: 'Image of book'})
  readonly img: string

  @ApiProperty({example: '25/02/2022', description: 'Start date of reading a book'})
  @IsString({message: "date should be a string"})
  readonly start_date: string

  @ApiProperty({example: '1', description: 'Owner of book'})
  readonly userId: number
}
