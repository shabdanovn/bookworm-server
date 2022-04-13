import { ApiProperty } from "@nestjs/swagger";

export class UpdateChallengeDto{
  @ApiProperty({example: '1', description: 'id of a challenge'})
  readonly id:number

  @ApiProperty({example: 'Image', description: 'Image of a challenge'})
  readonly img:string

  @ApiProperty({example: 'Reading 2 books', description: 'Title of a challenge'})
  readonly title:string

  @ApiProperty({example: 'New challenge', description: 'Description'})
  readonly description: string

  @ApiProperty({example: 'New challenge', description: 'Description'})
  readonly punishment: string

  @ApiProperty({example: '25/02/2022', description: 'Start date'})
  readonly start_date: string

  @ApiProperty({example: '25/02/2022', description: 'End date'})
  readonly end_date:string

  @ApiProperty({example: '1', description: 'Id of a creator of a challenge'})
  readonly userId:number
}
