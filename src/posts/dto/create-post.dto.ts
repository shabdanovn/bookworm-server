import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePostDto{
  @ApiProperty({example: 'Image link', description: 'Image of a post'})
  img: string

  @ApiProperty({example: 'Coelho', description: 'Descr of post'})
  @IsString({message: "descr should be a string"})
  description: string

  @ApiProperty({example: '1', description: 'id of an author'})
  authorId: number
}