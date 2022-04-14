import { ApiProperty } from "@nestjs/swagger";

export class CreateFollowingDto{
  @ApiProperty({example: '1', description: 'user ID'})
  userId: number

  @ApiProperty({example: '1', description: 'follwoing ID'})
  followingId: number
}