import { ApiProperty } from "@nestjs/swagger";

export class DeleteSavedPostsDto {
  @ApiProperty({example: '1', description: 'Id of saved post'})
  postId: number

  @ApiProperty({example: '1', description: 'Id of user'})
  userId: number
}
