import { ApiProperty } from "@nestjs/swagger";

export class CreateFollowersDto {
  @ApiProperty({example: '1', description: 'user ID'})
  userId: number

  @ApiProperty({example: '1', description: 'follwoing ID'})
  followerId: number
}