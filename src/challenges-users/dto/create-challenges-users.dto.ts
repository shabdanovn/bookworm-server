import { ApiProperty } from "@nestjs/swagger";

export class CreateChallengesUsersDto{
  @ApiProperty({example: '1', description: 'ID of user'})
  userId: number

  @ApiProperty({example: '1', description: 'ID of challenge'})
  challengeId: number
}