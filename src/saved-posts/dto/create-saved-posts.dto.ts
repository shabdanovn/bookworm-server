import { ApiProperty } from "@nestjs/swagger";

export class CreateSavedPostsDto {
  @ApiProperty({example: '1', description: 'Id of user'})
  userId: number

  @ApiProperty({example: '1', description: 'Id of a post'})
  postId: number
}
