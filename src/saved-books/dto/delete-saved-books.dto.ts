import { ApiProperty } from "@nestjs/swagger";

export class DeleteSavedBooksDto {
  @ApiProperty({example: '1', description: 'Id of saved book'})
  bookId: number

  @ApiProperty({example: '1', description: 'Id of user'})
  userId: number
}
