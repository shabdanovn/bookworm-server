import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { ChallengeComment } from "../challenge_comments/challenge-comments.model";

interface ChallengesModelCreationAttrs{
  img:string
  title:string
  description: string
  punishment: string
  start_date: string
  end_date:string
  userId:number
}

@Table({tableName: "challenges"})
export class Challenge extends Model<Challenge,  ChallengesModelCreationAttrs>{

  @ApiProperty({example: '1', description: 'ID of challenge'})
  @Column({type:DataType.INTEGER, autoIncrement:true, primaryKey: true, unique: true})
  id: number

  @ApiProperty({example: 'Reading 2 books', description: 'Title of a challenge'})
  @Column({type:DataType.STRING})
  title: string

  @ApiProperty({example: 'New challenge', description: 'Description'})
  @Column({type: DataType.TEXT})
  description: string

  @ApiProperty({example: 'New challenge', description: 'Description'})
  @Column({type: DataType.STRING})
  punishment: string

  @ApiProperty({example: 'Image', description: 'Image of a challenge'})
  @Column({type:DataType.STRING})
  img: string

  @ApiProperty({example: '25/02/2022', description: 'Start date'})
  @Column({type:DataType.STRING})
  start_date: string

  @ApiProperty({example: '25/02/2022', description: 'End date'})
  @Column({type:DataType.STRING})
  end_date: string

  @ApiProperty({example: '1', description: 'Id of a creator of a challenge'})
  @ForeignKey(() => User)
  @Column({type:DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User

  @HasMany(() => ChallengeComment)
  comments: ChallengeComment[]
}