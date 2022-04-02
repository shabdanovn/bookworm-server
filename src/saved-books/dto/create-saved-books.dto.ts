import { ApiProperty } from "@nestjs/swagger";

export class CreateSavedBooksDto {
  @ApiProperty({example: '1', description: 'Id of user'})
  userId: number

  @ApiProperty({example: '1', description: 'Id of a book'})
  bookId: number
}
